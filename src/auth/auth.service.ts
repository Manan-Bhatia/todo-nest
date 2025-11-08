import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  private readonly _logger = new Logger(AuthService.name);

  signUp(userName: string, password: string) {
    return this._userService.create(userName, password);
  }

  async signIn(userName: string, password: string) {
    const user = await this._userService.findByUserName(userName);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }
    const payload: JwtPayload = { sub: user.id };
    const accessToken = this._jwtService.sign(payload);
    return { accessToken };
  }
}
