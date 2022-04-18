import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from '../task/task.service';
import { NotifyService } from '../notify/notify.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TaskService, NotifyService],
})
export class BatchModule {}
