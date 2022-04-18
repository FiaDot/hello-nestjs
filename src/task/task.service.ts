import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  // 10초 마다 호출
  @Cron('0 * * * * *', { name: 'CronTask'})
  handleCron() {
    this.logger.log('task called.');
  }
}
