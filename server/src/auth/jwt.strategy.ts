import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthService } from './auth.service';
import { UserInfo } from './UserInfo';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRETKEY,
    });
  }

  async validate(payload: authDetail): Promise<UserInfo> {
    const user = await this.authService.validateToken(payload.username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

interface authDetail {
  username: string;
  iat: number;
  exp: number;
}
