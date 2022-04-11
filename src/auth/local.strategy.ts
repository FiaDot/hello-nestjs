import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {
  Dependencies,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      // 2개 지정 안해주면 /auth/login 호출시 validate로 넘어가지 않음.
      // 최소 2개 필드 사용해야 함
      usernameField: 'platformUID', // 기본 필드명 username
      passwordField: 'platformToken', // 기본 필드명 password
      passReqToCallback: false,
    });
  }

  async validate(platformUID: string, platformToken: string): Promise<any> {
    const user = await this.authService.validUser(platformUID, platformToken);
    if (!user) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }
    return user;
  }
}
