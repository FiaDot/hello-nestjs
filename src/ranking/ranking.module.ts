import { CacheModule, Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';
import * as redisStore from 'cache-manager-ioredis';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 16379,
    }),
  ],
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModule {}
