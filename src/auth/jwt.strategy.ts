import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      // header에 Bearer Token 값으로 포함해서 호출해야 서버에서 토큰을 받아 검사 할 수 있음
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: ExtractJwt.fromHeader('token'),
      ignoreExpiration: true, // false로 하면 token 만료 검증을 서버에서 따로 진행
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  // async validate(payload: any) {
  //   console.log(`JwtStrategy:validate payload=${payload}`);
  //   return payload; // { id: payload.id };
  // }
}
