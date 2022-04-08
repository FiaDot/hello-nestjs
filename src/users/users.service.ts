import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { DateTimeHelper } from '../common/helpers/datetime.helper';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const exists = await this.isUserExists(createUserDto.platformUID);
    if (exists) {
      throw new UnprocessableEntityException('이미 가입된 사용자 입니다.');
    }

    return await this.userRepository.create({
      ...createUserDto,
      loginAt: new Date(),
    });
  }

  async isUserExists(platformUID: string): Promise<boolean> {
    const user = await this.findOneByPlatformUID(platformUID);
    return !!user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return await this.userRepository.findByPk(id);
  }

  async findOneByPlatformUID(platformUID: string) {
    return await this.userRepository.findOne({ where: { platformUID } });
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
    const beginCond = beginDate
      ? {
          createdAt: { [Op.gte]: DateTimeHelper.get_date_by_string(beginDate) },
        }
      : {};

    const endCond = endDate
      ? { createdAt: { [Op.lte]: DateTimeHelper.get_date_by_string(endDate) } }
      : {};

    const where = {
      [Op.and]: [beginCond, endCond],
    };

    return await this.userRepository.findAll({ where });
  }
}
