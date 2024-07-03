import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { GetUserSearchDto } from './dto/get-user-search.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.createUser(authCredentialsDto);
  }

  @Post('/login')
  signin(@Body() loginDto: LoginDto): Promise<{ accessToken: string }> {
    return this.authService.login(loginDto);
  }

  @Get('/users')
  searchUser(@Query() searchDto: GetUserSearchDto): Promise<User[]> {
    return this.authService.searchUser(searchDto);
  }
}
