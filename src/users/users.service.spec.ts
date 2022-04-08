import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { DateTimeHelper } from '../common/helpers/datetime.helper';
import { getModelToken} from '@nestjs/sequelize';

// 로그 상세 정보 끄기
if (global.console.constructor.name === 'CustomConsole') {
  // you can also override the global.console with another CustomConsole of yours, like https://stackoverflow.com/a/57443150
  global.console = require('console');
}

const testUser = {
  id: 1,
  platformUID: 'test',
  lv: 1,
  exp: 0,
  gold: 0,
  isBlock: false,
};

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
          //useFactory: mockUserModel,
          useValue: {
            findByPk: jest.fn(() => testUser),
            findAll: jest.fn(() => [testUser]),
            findOne: jest.fn(),
            create: jest.fn(() => testUser),
            // remove: jest.fn(),
            // save: jest.fn(() => testUser),
            get: jest.fn(() => testUser),
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
    expect(user.id).toBeDefined();
  });

  it('createUser ', async () => {
    const createUserDto = new CreateUserDto();
    createUserDto.platformUID = 'test15';

    const user: User = await service.create(createUserDto);
    expect(user.id).toBeDefined();
  });

  it('find between date', async () => {
    const begin = DateTimeHelper.get_prev_day(2);
    const end = DateTimeHelper.get_now_string();

    const result = await service.findCreateAtBetweenDate(begin, end);
    expect(result).toBeDefined();
  });
});
