import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { CsvModule } from 'nest-csv-parser';

@Module({
  imports: [CsvModule],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
