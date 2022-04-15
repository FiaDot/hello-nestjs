import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // API 실행 이전에 먼저 실햄 됨. 유저의 상태를 검사해줌
  @Post('login')
  @ApiOperation({ summary: '인증 API', description: '유저 인증 후 토큰 반환' })
  @ApiBody({ type: LoginDto })
  async login(@Req() req) {
    return await this.authService.login(req.user);
  }

  // @Post('login')
  // @ApiOperation({ summary: '인증 API', description: '유저 인증' })
  // async login(@Body() loginDto: LoginDto) {
  //   return await this.authService.login(loginDto);
  // }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @Post('/verify')
  @ApiOperation({ summary: '인증 검증 API', description: '토큰 검증' })
  verify(@Req() req, @Body() loginDto: LoginDto) {
    console.log(req.user);
    console.log(loginDto);
    return req.user;
  }
}
