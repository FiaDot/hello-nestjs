import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
// import { NotifyService } from '../notify/notify.service';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  // constructor(private notifyService: NotifyService) {}

  // 10초 마다 호출
  @Cron('0 * * * * *', { name: 'CronTask' })
  handleCron() {
    this.logger.log('task called.');
    // (async () => {
    //   await this.notifyService.notifyText('task called.');
    // })();
  }
}
