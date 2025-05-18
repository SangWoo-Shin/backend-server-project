import { Controller, Post, Get, Patch, Param, Body, Req, UseGuards } from '@nestjs/common';
import { ProxyService } from '../proxy.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UpdateUserRoleDto } from 'src/dto/update-role.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @ApiOperation({ summary: '회원 가입' })
  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    return this.proxyService.post('/users/signup', body);
  }

  @ApiOperation({ summary: '개인 정보 조회' })
  @Get('profile')
  getProfile(@Req() req: Request) {
    const token = req.headers['authorization'];
    return this.proxyService.get('/users/profile', token);
  }

  @ApiOperation({ summary: '관리자 전용 - 이메일로 유저 정보 조회' })
  @Get(':email')
  getUserByEmail(@Param('email') email: string, @Req() req: Request) {
    const token = req.headers['authorization'];
    return this.proxyService.get(`/users/${encodeURIComponent(email)}`, token);
  }

  @ApiOperation({ summary: '관리자 전용 - 유저 권한 변경' })
  @Patch(':id/role')
  updateRole(
    @Param('id') id: string,
    @Body() body: UpdateUserRoleDto,
    @Req() req: Request,
  ) {
    const token = req.headers['authorization'];
    return this.proxyService.patch(`/users/${id}/role`, body, token);
  }
}