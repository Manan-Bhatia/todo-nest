import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInReqDto, SignInResDto } from './dto/sign-in.dto';
import { SignUpReqDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('signup')
  signUp(@Body() data: SignUpReqDto) {
    return this._authService.signUp(data.userName, data.password);
  }

  @Post('signin')
  signIn(@Body() data: SignInReqDto): Promise<SignInResDto> {
    return this._authService.signIn(data.userName, data.password);
  }
}
