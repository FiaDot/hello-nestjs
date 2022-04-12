import { Test, TestingModule } from '@nestjs/testing';
import { RankingService } from './ranking.service';
import { ConfigService } from '@nestjs/config';

describe('RankingService', () => {
  let service: RankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankingService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              switch (key) {
                case 'CACHE_HOST':
                  return 'localhost';
                case 'CACHE_PORT':
                  return 16379;
                default:
                  return null;
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<RankingService>(RankingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('set/get 테스트', async () => {
    const key = 'test_key';
    const value = 'test_value';

    const resPut = await service.put(key, value);
    expect(resPut).toBeDefined();

    const resGet = await service.get(key);
    expect(resGet).toBeDefined();
  });
});
