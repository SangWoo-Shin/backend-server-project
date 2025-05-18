import { Controller, UseGuards, Post, Patch, Body, Req, Get, Param, UnauthorizedException } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { User } from './user.schema';
import { UserRole } from './roles.enum';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRoleDto } from './dto/\bupdate-role.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
) {}

  @ApiOperation({ summary: '회원 가입' })
  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto.email, createUserDto.password);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '개인 정보 조회' })
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req) {
    return req.user;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자 전용 - 이메일로 유저 정보 조회' })
  @UseGuards(JwtAuthGuard)
  @Get(':email')
  async getUser(@Req() req, @Param('email') email: string) {
    if (req.user.role !== 'ADMIN') {
      throw new UnauthorizedException('관리자 권한이 필요합니다.');
    }
    const decodedEmail = decodeURIComponent(email);
    return this.userService.findByEmail(decodedEmail);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: '관리자 전용 - 유저 권한 변경' })
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN) 
  @Patch(':id/role')
  async updateRole(
    @Param('id') id: string,
    @Body() body: UpdateUserRoleDto,
  ): Promise<User> {
    return this.userService.updateUserRole(id, body.role);
  }
}