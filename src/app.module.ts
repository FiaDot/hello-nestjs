import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   useFactory: () => ({
    //     type: 'mysql',
    //     host: 'localhost',
    //     port: 13306,
    //     username: 'everse',
    //     password: 'asdf1234!',
    //     database: 'everse',
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     synchronize: true,
    //     timezone: 'Asia/Seoul',
    //   }),
    // }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 13306,
      username: 'everse',
      password: 'asdf1234!',
      database: 'everse',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      // timezone: 'Asia/Seoul',
      // timezone: 'Z',
      timezone: 'local',
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
