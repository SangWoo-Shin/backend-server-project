import { Controller, Headers, Get, Post, Query, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, 
    private readonly userService: UserService,
     private readonly jwtService: JwtService,
  ) {} 

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const token = await this.authService.login(body.email, body.password);
    if (!token) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
    return token;
  }

  @Get('validate')
  async validateUser(@Query('userId') userId: string): Promise<User | null> {
    return this.userService.findById(userId);
  }

  @Get('verify')
  async verifyToken(@Headers('Authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('토큰이 없습니다.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);

      console.log(payload);
      
      return {
        email: payload.email,
        userId: payload.sub,
        role: payload.role,
      };
    } catch (error) {
      throw new UnauthorizedException('토큰인증에 실패했습니다.');
    }
  }
}