import { Injectable } from '@nestjs/common';
import { PasswordService } from './password.service';
// @ts-ignore
// eslint-disable-next-line
import { UserService } from '../user/user.service';
import { UserInfo } from './UserInfo';
import { JwtService } from '@nestjs/jwt';
import { Credentials } from './Credentials';
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser({ username, password }: Credentials) {
    const user = await this.userService.findByLogin({ username, password });
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }

  async validateToken(username: string) {
    const user = await this.userService.findByPayload({ username: username });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async register(cred: Credentials) {
    let status = {
      success: true,
      message: 'User registered',
    };

    try {
      let { username, password } = cred;
      const res = await this.userService.create({
        data: { username: username, password: password },
      });
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }

    return status;
  }

  async login({ username, password }: Credentials) {
    const user = await this.userService.findByLogin({ username, password });
    const token = this.createToken(user);
    return { username: user.username, ...token };
  }

  private createToken({ username }: Credentials) {
    const accessToken = this.jwtService.sign({ username });
    return {
      expiresIn: process.env.EXPIRESIN,
      accessToken,
    };
  }
}
