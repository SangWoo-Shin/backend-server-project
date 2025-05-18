import { Controller,Post,Get, Req, Body, Headers, Query, UseGuards } from '@nestjs/common';
import { ProxyService } from '../proxy.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from 'src/dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @ApiOperation({ summary: '로그인 (JWT 토큰 발급)' })
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.proxyService.post('/auth/login', body);
  }

  @ApiOperation({
    summary: 'JWT 토큰 검증',
    description: 'Authorization 헤더에 전달된 JWT 토큰의 유효성을 확인하고, 해당 유저의 이메일, ID, 역할 정보를 반환합니다.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('verify')
  verify(@Headers('Authorization') authHeader: string) {
    return this.proxyService.get('/auth/verify', authHeader);
  }
}