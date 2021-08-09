import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { PrismaService } from 'nestjs-prisma';
import { Credentials } from 'src/auth/Credentials';
import { PasswordService } from '../auth/password.service';
import { UserServiceBase } from './base/user.service.base';

@Injectable()
export class UserService extends UserServiceBase {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly passwordService: PasswordService
  ) {
    super(prisma, passwordService);
  }

  async findByLogin({ username, password }: Credentials) {
    const user = await this.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (!compareSync(password, user.password)) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    return user;
  }

  async findByPayload({ username }: Partial<Credentials>) {
    return await this.findOne({ where: { username } });
  }
}
