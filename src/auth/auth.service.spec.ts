import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { UsersService } from '../users/users.service';

const encoded = {
  id: 1,
  platformUID: '123',
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn((payload) => encoded),
          },
        },
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
          provide: UsersService,
          useValue: {
            findOneByPlatformUID: jest.fn(() => encoded),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
