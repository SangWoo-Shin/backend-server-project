import { Controller,Post,Get, Req, Body, Headers, Query, UseGuards } from '@nestjs/common';
import { ProxyService } from '../proxy.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('auth')
export class AuthProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post('login')
  login(@Body() body: any) {
    return this.proxyService.post('/auth/login', body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify')
  verify(@Headers('Authorization') authHeader: string) {
    return this.proxyService.get('/auth/verify', authHeader);
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate')
  validate(@Query('userId') userId: string, @Headers('Authorization') authHeader: string) {
    return this.proxyService.get(`/auth/validate?userId=${userId}`, authHeader);
  }
}