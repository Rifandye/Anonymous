import { IsEmail, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsOptional()
  username: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
