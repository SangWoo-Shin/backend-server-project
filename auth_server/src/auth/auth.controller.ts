import { Controller, Headers, Param, Get, Post, UseGuards, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Roles } from './decorators/roles.decorator';
import { UserRole } from 'src/user/roles.enum';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, 
    private readonly jwtService: JwtService,
  ) {} 

  @ApiOperation({ summary: '로그인 (JWT 토큰 발급)' })
  @Post('login')
  async login(@Body() body: LoginDto) {
    const token = await this.authService.login(body.email, body.password);
    if (!token) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
    return token;
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'JWT 토큰 검증',
    description: 'Authorization 헤더에 전달된 JWT 토큰의 유효성을 확인하고, 해당 유저의 이메일, ID, 역할 정보를 반환합니다.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('verify')
  async verifyToken(@Headers('Authorization') authHeader: string) {
    const token = authHeader?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('토큰이 없습니다.');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      
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