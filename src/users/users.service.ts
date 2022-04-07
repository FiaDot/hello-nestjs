import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import moment from 'moment';
import { Op } from 'sequelize';

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

    const user = new User();
    user.platformUID = createUserDto.platformUID;
    user.loginAt = new Date();
    // user.loginAt = LocalDateTime.now(); // moment().utcOffset(9).toDate();

    //return this.userRepository.save(user);
    return user;
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
    const user = await this.userRepository.findOne({ where: { platformUID } });
    return null;
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
    // string 으로 받아서 moment로 변환 후 range 설정!
    const beginCond = beginDate
      ? { date: { [Op.gte]: moment(beginDate).toDate() } }
      : {};
    const endCond = endDate
      ? { date: { [Op.lte]: moment(endDate).toDate() } }
      : {};

    const where = {
      [Op.and]: [beginCond, endCond],
    };

    return await this.userRepository.findAll({ where });
  }
}
