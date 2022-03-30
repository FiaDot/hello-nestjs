import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from 'src/util/swagger';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'silly',
          format:
            process.env.NODE_ENV === 'production'
              ? winston.format.simple()
              : winston.format.combine(
                  winston.format.timestamp(),
                  utilities.format.nestLike('hello-nestjs', {
                    prettyPrint: true,
                  }),
                ),
        }),
      ],
    }),
  });

  // Swagger 설정
  setupSwagger(app);
  await app.listen(3000);
  logger.log('App listening at 3000');
}
bootstrap();
