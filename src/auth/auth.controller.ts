import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('signup')
  signUp(@Body() data: SignUpDto) {
    return this._authService.signUp(data.userName, data.password);
  }

  @Post('signin')
  signIn(@Body() data: SignInDto) {
    return this._authService.signIn(data.userName, data.password);
  }
}
