import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DateTimeHelper } from '../common/helpers/datetime.helper';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async login(id: string) {
    const expire_date = DateTimeHelper.get_now_add_sec(
      this.configService.get('JWT_EXPIRATION_TIME'),
    );
    const payload = { id, expire_at: expire_date };
    return { access_token: this.jwtService.sign(payload) };
  }
}
