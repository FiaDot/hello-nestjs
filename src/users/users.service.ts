import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  Repository,
} from 'typeorm';
import { User } from './entities/user.entity';
import * as moment from 'moment-timezone';
import { DateTimeHelper } from '../common/helpers/datetime.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const exists = await this.isUserExists(createUserDto.platformUID);
    if (exists) {
      throw new UnprocessableEntityException('이미 가입된 사용자 입니다.');
    }

    const user = new User();
    user.platformUID = createUserDto.platformUID;
    user.loginAt = moment().utcOffset(9).toDate();

    return this.userRepository.save(user);
  }

  async isUserExists(platformUID: string): Promise<boolean> {
    const user = await this.findOneByPlatformUID(platformUID);
    return !!user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByPlatformUID(platformUID: string) {
    const user = await this.userRepository.findOne({ where: { platformUID } });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findCreateAtBetweenDate(
    beginDate: string,
    endDate: string,
  ): Promise<User[]> {
    // TODO : string 으로 받아서 moment로 변환 후 range 설정!
    const begin: Date = DateTimeHelper.get_str_to_date(beginDate);
    const end: Date = DateTimeHelper.get_str_to_date(endDate);

    return await this.userRepository.find({
      where: {
        createdAt: Between(begin, end),
      },
    });
  }
}
