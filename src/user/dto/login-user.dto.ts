import { IsEmail, IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class LoginUserDto {
  @IsOptional()
  @IsMongoId()
  id: Types.ObjectId;

  @IsOptional()
  login: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEmail()
  email: string;
}
