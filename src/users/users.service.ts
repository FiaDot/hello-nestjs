import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

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
    return this.userRepository.save(user);
  }

  async isUserExists(platformUID: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { platformUID } });
    console.log('isUserExists');
    console.log(user);
    return !!user;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
