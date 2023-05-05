import { IsNumber, IsPhoneNumber } from 'class-validator';

export class SignInUserDto {
  @IsPhoneNumber('KZ')
  phone: string;

  @IsNumber()
  code: number;
}
