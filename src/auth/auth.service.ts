import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import {
  InvalidatedRefreshTokenError,
  RefreshTokenIdsStorage,
} from './authentication/refresh-token-ids.storage/refresh-token-ids.storage';
import jwtConfig from './config/jwt.config';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { ActiveUserData } from './interface/active-user-data.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
    private readonly httpService: HttpService,
  ) {}

  async sendUserVerificationCode(phone: string) {
    let user = await this.userService.findOneByPhone(phone);
    if (!user) {
      user = await this.userService.create(phone);
    }
    const otp = this.generateVerificationCode();
    console.log('OTP', otp);

    const smsResult = await this.httpService.axiosRef.get(
      `https://smsc.kz/sys/send.php?login=App-lawyer&psw=!b7LvQje7@dQRCw&phones=${phone}&mes=Подтверждение primelegal.kz: 1234:${otp}`,
    );
    // console.log('SMS', smsResult);
    const otpExpirationDate = new Date(Date.now() + 4 * 60 * 1000);
    await this.userService.createOTP(user, { otp, otpExpirationDate });

    return true;
  }

  generateVerificationCode() {
    return Math.floor(1000 + Math.random() * 900);
  }

  async validateUser(phone: string, code: number) {
    const user = await this.userService.findOneByPhone(phone);
    if (!user) {
      throw new UnauthorizedException('Invalid phone number');
    }
    const otp = await this.userService.findValidOtp(user, code);
    if (!otp) {
      throw new UnauthorizedException('Invalid code');
    }
    return await this.generateToken(user);
  }

  private async generateToken(user: User) {
    const refreshTokenId = randomUUID();
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.phone,
        user,
        this.jwtConfiguration.accessTokenTtl,
        {
          role: user.role,
        },
      ),
      this.signToken(user.phone, user, this.jwtConfiguration.refreshTokenTtl, {
        refreshTokenId,
      }),
    ]);
    await this.refreshTokenIdsStorage.insert(user.id, refreshTokenId);
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'> & { refreshTokenId: string }
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const user = await this.userService.findOneById(sub);
      if (!user) {
        throw new UnauthorizedException();
      }
      const isValid = await this.refreshTokenIdsStorage.validate(
        user.id,
        refreshTokenId,
      );

      if (isValid) {
        await this.refreshTokenIdsStorage.invalidate(user.id);
      } else {
        throw new Error('Refresh token is invalid');
      }
      return this.generateToken(user);
    } catch (err) {
      if (err instanceof InvalidatedRefreshTokenError) {
        // Take action: notify user that his refresh token might have been stolen?
        throw new UnauthorizedException('Access denied');
      }
      throw new UnauthorizedException();
    }
  }

  private async signToken<T extends Record<string, unknown>>(
    phone: string,
    user: User,
    expiresIn: number,
    payload: T,
  ) {
    return await this.jwtService.signAsync(
      {
        phone,
        sub: user.id,
        role: user.role,
        ...payload,
      } as ActiveUserData & T,
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }

  async findOne(userId: string) {
    return await this.userService.findOneById(userId);
  }
}
