import {
  ExecutionContext,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    // Authorization: Bearer token_value 사용할 때
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (authorization === undefined)
      throw new UnauthorizedException('token 없음');

    const token = authorization.replace('Bearer ', '');
    request.user = this.validateToken(token);

    // header.token 사용할 때
    // const request = context.switchToHttp().getRequest();
    // const { token } = request.headers;
    // if (token === undefined) throw new UnauthorizedException('token 없음');
    //
    // request.user = this.validateToken(token);
    return true;
  }

  validateToken(token: string) {
    const secret = this.configService.get('JWT_SECRET');

    try {
      const verify = this.jwtService.verify(token, { secret });
      return verify;
    } catch (e) {
      console.log(`jwtAuthGuard:validateToken() ${e.message}`);

      switch (e.message) {
        case 'INVALID_TOKEN':
        case 'TOKEN_IS_ARRAY':
        case 'NO_USER':
          throw new HttpException('유효하지 않은 토큰', 401);
        case 'EXPIRED_TOKEN':
          throw new HttpException('토큰 만료', 410);
        default:
          throw new HttpException('인증 서버 오류', 500);
      }
    }
  }
}
