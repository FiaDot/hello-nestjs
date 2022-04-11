import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DateTimeHelper } from '../common/helpers/datetime.helper';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

  async login(id: string) {
    const user = await this.usersService.findOneByPlatformUID(id);

    if (!user) {
      throw new NotFoundException('해당 유저를 찾을 수 없습니다.');
    }

    const expire_date = DateTimeHelper.get_now_add_sec(
      this.configService.get('JWT_EXPIRATION_TIME'),
    );
    const payload = { pid: id, expire_at: expire_date, id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
