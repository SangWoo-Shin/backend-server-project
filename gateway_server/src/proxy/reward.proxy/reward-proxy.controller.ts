import { Controller, Post, Body, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ProxyService } from '../proxy.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateRewardDto } from 'src/dto/create-reward.dto';

@ApiTags('Rewards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('rewards')
export class RewardProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @ApiOperation({ summary: "신규 보상 생성 - 관리자 또는 운영자만 가능"})
  @Post()
  createReward(@Body() body: CreateRewardDto, @Req() req: Request) {
    const token = req.headers['authorization'];
    return this.proxyService.post('/rewards', body, token);
  }

  @ApiOperation({ summary: "모든 보상목록 조회 - 관리자, 운영자, 감사자 권한"})
  @Get()
  getAllRewards(@Req() req: Request) {
    const token = req.headers['authorization'];
    return this.proxyService.get('/rewards', token);
  }

  @ApiOperation({ summary: "이벤트 ID로 보상정보 조회 - 관리자, 운영자, 감사자 권한"})
  @Get('event/:eventId')
  getRewardsByEvent(@Param('eventId') eventId: string, @Req() req: Request) {
    const token = req.headers['authorization'];
    return this.proxyService.get(`/rewards/event/${eventId}`, token);
  }

  @ApiOperation({ summary: "보상 ID로 보상정보 조회 - 관리자, 운영자, 감사자 권한"})
  @Get(':id')
  getRewardById(@Param('id') id: string, @Req() req: Request) {
    const token = req.headers['authorization'];
    return this.proxyService.get(`/rewards/${id}`, token);
  }
}