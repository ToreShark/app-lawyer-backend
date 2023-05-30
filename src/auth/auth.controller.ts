import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './authentication/decorators/auth.decorator';
import { AuthType } from './authentication/enum/auth-type.enum';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { SendCodeDto } from './dtos/send.code.dto';
import { SignInUserDto } from './dtos/sign-in-user.dto';
import { Response } from 'express';

@Auth(AuthType.None)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async sendCode(@Body() body: SendCodeDto) {
    return this.authService.sendUserVerificationCode(body.phone);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() signUserDto: SignInUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken } = await this.authService.validateUser(
      signUserDto.phone,
      signUserDto.code,
    );

    response.cookie('accessToken', accessToken, {
      // secure: process.env.NODE_ENV !== 'development',
      secure: true,
      httpOnly: false,
      sameSite: 'none',
    });

    return { message: 'Login successful' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('accessToken');
    console.log('logout');
    return { message: 'Logout successful' };
  }
}
