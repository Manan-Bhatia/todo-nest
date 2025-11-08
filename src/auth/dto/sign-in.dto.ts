import { IsNotEmpty, IsString } from 'class-validator';

export class SignInReqDto {
  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignInResDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
