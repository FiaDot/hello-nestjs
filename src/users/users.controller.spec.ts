import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { Logger } from '@nestjs/common';

const testUser = {
  id: 1,
  platformUID: 'test',
  lv: 1,
  exp: 0,
  gold: 0,
  isBlock: false,
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: Logger,
          useValue: {
            log: jest.fn(),
          },
        },
        {
          provide: getModelToken(User),
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

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
