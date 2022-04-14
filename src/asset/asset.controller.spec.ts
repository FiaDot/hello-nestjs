import { Test, TestingModule } from '@nestjs/testing';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { CsvModule } from 'nest-csv-parser';

describe('AssetController', () => {
  let controller: AssetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CsvModule],
      controllers: [AssetController],
      providers: [AssetService],
    }).compile();

    controller = module.get<AssetController>(AssetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
