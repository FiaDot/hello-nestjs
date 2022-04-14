import { Test, TestingModule } from '@nestjs/testing';
import { AssetService } from './asset.service';
import { CsvModule } from 'nest-csv-parser';

describe('AssetService', () => {
  let service: AssetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CsvModule],
      providers: [AssetService],
    }).compile();

    service = module.get<AssetService>(AssetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
