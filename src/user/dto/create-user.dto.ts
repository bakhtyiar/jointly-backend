import {
  IsEmail,
  IsStrongPassword,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @MinLength(5, {
    message: 'Login is too short. Minimal length is $constraint1',
  })
  @MaxLength(50, {
    message: 'Login is too long. Maximum length is $constraint1',
  })
  @Length(5, 20)
  login: string;

  @IsStrongPassword()
  password: string;

  @IsEmail()
  email: string;
}
