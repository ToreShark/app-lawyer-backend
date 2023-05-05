import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './authentication/decorators/auth.decorator';
import { AuthType } from './authentication/enum/auth-type.enum';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { SendCodeDto } from './dtos/send.code.dto';
import { SignInUserDto } from './dtos/sign-in-user.dto';

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
  async login(@Body() signUserDto: SignInUserDto) {
    return this.authService.validateUser(signUserDto.phone, signUserDto.code);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-token')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }
}
