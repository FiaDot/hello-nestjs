import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { DateTimeHelper } from '../common/helpers/datetime.helper';
import { AppModule } from '../app.module';
import { getModelToken, SequelizeModule } from '@nestjs/sequelize';

// 로그 상세 정보 끄기
if (global.console.constructor.name === 'CustomConsole') {
  // you can also override the global.console with another CustomConsole of yours, like https://stackoverflow.com/a/57443150
  global.console = require('console');
}

// const mockUsersService = {
//   async create(createUserDto: CreateUserDto) {
//     const user = new User();
//     user.id = 1;
//     user.platformUID = createUserDto.platformUID;
//     user.lv = 1;
//     user.exp = 0;
//     user.loginAt = undefined;
//     user.createdAt = undefined;
//     user.updatedAt = undefined;
//     return user;
//   },
// };

// const mockModel = {
//   findByPk: jest.fn((id) => {
//     const testUser = new User();
//     testUser.id = id;
//     testUser.platformUID = 'test';
//     return testUser;
//   }),
// };

const mockUserModel = () => ({
  findByPk: jest.fn((id) => {
    const testUser = new User();
    testUser.id = id;
    testUser.platformUID = 'test';
    return testUser;
  }),
});

const testUser = { id: 1, platformUID: 'test' };

describe('UsersService', () => {
  let service: UsersService;
  let model: typeof User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // 실제 DB에 접속해서 하는 방법
      // imports: [SequelizeModule.forFeature([User])],
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          //useValue: mockModel,
          //useFactory: mockUserModel,
          useValue: {
            findByPk: jest.fn((id) => testUser),
            findAll: jest.fn(() => [testUser]),
            findOne: jest.fn(),
            create: jest.fn(() => testUser),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<typeof User>(getModelToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOne', async () => {
    const user: User = await service.findOne(1);
    console.log(`user=${JSON.stringify(user)}`);
    expect(user.id).toBeDefined();
  });

  it('createUser ', async () => {
    const createUserDto = new CreateUserDto();
    createUserDto.platformUID = 'test15';

    const user: User = await service.create(createUserDto);
    console.log(`user=${JSON.stringify(user)}`);
    expect(user.id).toBeDefined();

    // console.log(`create login = ${user.loginAt}`);
    // console.log(`create create= ${user.createdAt}`);

    // const recordedUser = await service.findOneByPlatformUID(
    //   createUserDto.platformUID,
    // );
    // console.log(`record login = ${recordedUser.loginAt}`);
    // console.log(`record create= ${recordedUser.createdAt}`);
  });

  // it('find between date', async () => {
  //   const begin = DateTimeHelper.get_prev_day(2);
  //   const end = DateTimeHelper.get_now_string();
  //
  //   const result = await service.findCreateAtBetweenDate(begin, end);
  //   console.log(`result=${JSON.stringify(result)}`);
  // });
});
