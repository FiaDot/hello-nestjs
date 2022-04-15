import { Injectable } from '@nestjs/common';
import { CsvParser } from 'nest-csv-parser';
import * as fs from 'fs';
import { CsvConfig } from './entities/csv-config.entity';

@Injectable()
export class AssetService {
  constructor(private readonly csvParser: CsvParser) {
    (async () => {
      await this.parse();
    })();
  }

  async parse() {
    // Create stream from file (or get it from S3)
    const stream = fs.createReadStream(__dirname + '/csv/' + 'CSVConfig.csv');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const csvConfigs: CsvConfig[] = await this.csvParser.parse(
      stream,
      CsvConfig,
    );

    // console.log(csvConfigs);
    return csvConfigs;
  }
}
