import { IsEmail, IsOptional, IsString } from 'class-validator';

export class LoginUserDto {
  @IsOptional()
  login: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
