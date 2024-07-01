import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    try {
      const { username, email, password } = authCredentialsDto;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = this.userRepository.create({
        username,
        email,
        password: hashedPassword,
      });

      await this.userRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username or Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { username, email, password } = loginDto;

    let user: User;

    if (username) {
      user = await this.userRepository.findOne({ where: { username } });
    } else if (email) {
      user = await this.userRepository.findOne({ where: { email } });
    }

    if (!user) {
      throw new NotFoundException('User Not Registered');
    }

    const comparedPass = await bcrypt.compare(password, user.password);

    if (!comparedPass) {
      throw new UnauthorizedException('Please check your login credentials');
    }

    const payload: JwtPayload = { username: user.username, email: user.email };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
