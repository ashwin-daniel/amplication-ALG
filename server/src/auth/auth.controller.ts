import { BadRequestException, Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Credentials } from './Credentials';
@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: Credentials) {
    const user = await this.authService.login(body);
    if (!user) {
      throw new UnauthorizedException('The passed credentials are incorrect');
    }
    return user;
  }

  @Post('register')
  async register(@Body() body: Credentials) {
    const user = await this.authService.register(body);
    if (!user.success) {
      throw new BadRequestException('Invalid data');
    }
    return user;
  }
}
