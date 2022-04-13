import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
  SequelizeHealthIndicator,
} from '@nestjs/terminus';
import { ApiOperation } from '@nestjs/swagger';

@Controller('health-check')
export class HealthCheckController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: SequelizeHealthIndicator,
  ) {}

  @ApiOperation({
    summary: '헬스 체크 API',
    description: '각종 서버의 상태를 체크',
  })
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
      () => this.db.pingCheck('db'),
    ]);
  }
}
