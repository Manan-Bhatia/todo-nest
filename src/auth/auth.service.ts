import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async signUp() {
    return 'Sign up';
  }

  async signIn() {
    return 'Sign in';
  }
}
