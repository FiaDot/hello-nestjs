import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ summary: '인증 API', description: '유저 인증' })
  async login(@Body() login: LoginDto) {
    // TODO : DB
    return await this.authService.login(login.platformUID);
  }
}
