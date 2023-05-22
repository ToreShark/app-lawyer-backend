import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../../../../auth/config/jwt.config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from '../../../../auth/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    // check token in request header
    // if (!request.headers) {
    //   throw new UnauthorizedException('No headers present in the request');
    // }

    // if (!request.cookies) {
    //   throw new UnauthorizedException('No cookies present in the request');
    // }

    // console.log('request.headers', request.headers);
    // console.log(
    //   request.cookies['accessToken'] || request.headers['authorization'],
    // );
    const token =
      request.cookies['accessToken'] ||
      request.headers['authorization']?.split(' ')?.[1];

    if (!token) {
      console.log('No token present in the request');
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );
      request[REQUEST_USER_KEY] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
