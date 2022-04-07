import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 13306,
      username: 'everse',
      password: 'asdf1234!',
      database: 'everse',
      // pool: {
      //   max: 5,
      //   min: 1,
      //   acquire: 30000,
      //   idle: 10000,
      // },
      dialectOptions: {
        charset: 'utf8mb4',
        // typeCast, dateStrings 2개의 옵션이 true가 아니면 select 시에 시간이 UTC로 나옴
        // dateStrings: true,
        // typeCast: true,
      },
      logging: true,
      synchronize: true,
      // autoLoadModels: true, // models 정의 할 필요없이 전체 엔티티 검색해서 등록
      models: [User],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
