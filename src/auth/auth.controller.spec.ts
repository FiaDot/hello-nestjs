import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

const encoded = {
  id: 1,
  platformUID: '123',
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((type) => {
              switch (type) {
                case 'JWT_EXPIRATION_TIME':
                  return 100;
                default:
                  return null;
              }
            }),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn((payload) => encoded),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOneByPlatformUID: jest.fn(() => encoded),
          },
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
