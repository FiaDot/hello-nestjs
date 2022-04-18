import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { RankingModule } from './ranking/ranking.module';
import { AssetModule } from './asset/asset.module';
import { HealthCheckController } from './health-check/health-check.controller';
import * as Joi from 'joi';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { BatchModule } from './batch/batch.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development', '.env.production'],
      isGlobal: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.number().required(),
        CACHE_HOST: Joi.string().required(),
        CACHE_PORT: Joi.number().required(),
      }),
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'mysql',
        host: config.get('DB_HOST'),
        port: config.get('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_DATABASE'),
        // pool: {
        //   max: 5,
        //   min: 1,
        //   acquire: 30000,
        //   idle: 10000,
        // },
        dialectOptions: {
          charset: 'utf8mb4',
          // typeCast, dateStrings 2개의 옵션이 true가 아니면 select 시에 시간이 UTC로 나옴
          dateStrings: true, // 날짜를 string으로 가져오기
          typeCast: true, // 날짜의 경우 타입 캐스팅
        },
        timezone: '+09:00', // Asia/Seoul
        logging: true,
        synchronize: true,
        autoLoadModels: true, // models 정의 할 필요없이 전체 엔티티 검색해서 등록
        // models: [User], // 수동으로 추가했을 때 테이블 생성 안됨
      }),
    }),
    TerminusModule, // health checker
    HttpModule, // axios
    UsersModule,
    AuthModule,
    RankingModule,
    AssetModule,
    BatchModule,
  ],
  controllers: [AppController, HealthCheckController],
  providers: [AppService],
})
export class AppModule {}
