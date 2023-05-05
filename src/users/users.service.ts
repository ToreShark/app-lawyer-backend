import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { Otp } from './entities/otp.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Otp)
    private otpRepository: Repository<Otp>,
  ) {}

  create(phone: string) {
    const user = this.usersRepository.create({ phone });
    return this.usersRepository.save(user);
  }

  async createOTP(user: User, { otp, otpExpirationDate }: any): Promise<Otp> {
    const newOtp = new Otp();
    newOtp.user = user;
    newOtp.code = otp;
    newOtp.expirationDate = otpExpirationDate;
    return this.otpRepository.save(newOtp);
  }

  async findValidOtp(user: User, code: number): Promise<Otp | null> {
    const otp = await this.otpRepository.findOne({
      where: {
        user: { id: user.id },
        code,
        expirationDate: MoreThan(new Date()),
      },
    });

    return otp;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneById(id: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  findOneByPhone(phone: string) {
    return this.usersRepository.findOne({ where: { phone } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
