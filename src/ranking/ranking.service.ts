import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RankingService {
  private redis: Redis;

  constructor(private configService: ConfigService) {
    this.redis = new Redis({
      port: configService.get('CACHE_PORT'),
      host: configService.get('CACHE_HOST'),
      family: 4, // 4 (IPv4) or 6 (IPv6)
      // password: '',
      db: 0,
      connectTimeout: 10000,
    });

    // const cc = async () => {
    //   await this.put('key', 'test');
    //   const v = await this.get('key');
    //   console.log(v);
    // };
    // cc();
  }

  async put(key: string, value: string): Promise<string> {
    // await this.cacheManager.set(key, value);
    // const client = await this.redisService.getClient();
    return await this.redis.set(key, value);
  }

  async get(key: string): Promise<any> {
    // const value: string = await this.cacheManager.get('key');
    // const client = await this.redisService.getClient();
    const value = await this.redis.get(key);
    return value;
  }
}
