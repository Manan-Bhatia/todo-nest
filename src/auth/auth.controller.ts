import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('signup')
  signUp() {
    return this._authService.signUp();
  }

  @Post('signin')
  signIn() {
    return this._authService.signIn();
  }
}
