import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { DateTimeHelper } from '../common/helpers/datetime.helper';

// 로그 상세 정보 끄기
if (global.console.constructor.name === 'CustomConsole') {
  // you can also override the global.console with another CustomConsole of yours, like https://stackoverflow.com/a/57443150
  global.console = require('console');
}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 13306,
          username: 'everse',
          password: 'asdf1234!',
          database: 'everse',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
          //timezone: 'Asia/Seoul',
          //timezone: 'Z',
          timezone: 'local',
        }),
        TypeOrmModule.forFeature([User]),
      ],
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('date checker', async () => {
    const createUserDto = new CreateUserDto();
    createUserDto.platformUID = 'test14';

    const user: User = await service.create(createUserDto);
    expect(user.uid).toBeDefined();

    console.log(`create login = ${user.loginAt}`);
    console.log(`create create= ${user.createdAt}`);

    const recordedUser = await service.findOneByPlatformUID(
      createUserDto.platformUID,
    );
    console.log(`record login = ${recordedUser.loginAt}`);
    console.log(`record create= ${recordedUser.createdAt}`);
  });

  it('find between date', async () => {
    const begin = DateTimeHelper.get_prev_day(2);
    const end = DateTimeHelper.get_now_string();

    const result = await service.findCreateAtBetweenDate(begin, end);
    console.log(`result=${JSON.stringify(result)}`);
  });
});
