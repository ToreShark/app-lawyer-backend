import { IsPhoneNumber } from 'class-validator';

export class SendCodeDto {
  @IsPhoneNumber('KZ')
  phone: string;
}
