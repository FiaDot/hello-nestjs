import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { VerifyDto } from './dto/verify.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // API 실행 이전에 먼저 실햄 됨. 유저의 상태를 검사해줌
  @Post('login')
  // @ApiOperation({ summary: '인증 API', description: '유저 인증' })
  async login(@Req() req) {
    return await this.authService.login(req.user);
  }

  // @Post('login')
  // @ApiOperation({ summary: '인증 API', description: '유저 인증' })
  // async login(@Body() loginDto: LoginDto) {
  //   return await this.authService.login(loginDto);
  // }

  // @UseGuards(JwtAuthGuard)
  @Post('/verify')
  @ApiOperation({ summary: '인증 검증 API', description: '토큰 검증' })
  verify(@Body() verifyDto: VerifyDto) {
    return 'test';
  }
}
