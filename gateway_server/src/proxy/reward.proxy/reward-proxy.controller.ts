import { Controller, Post, Body, Get, Param, Patch, Headers, Query, UseGuards } from '@nestjs/common';
import { ProxyService } from '../proxy.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('rewards')
@UseGuards(JwtAuthGuard)
export class RewardProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post()
  createReward(@Body() body: any, @Headers('Authorization') authHeader: string) {
    return this.proxyService.post('/rewards', body, authHeader);
  }

  @Get()
  getAllRewards(@Headers('Authorization') authHeader: string) {
    return this.proxyService.get('/rewards', authHeader);
  }

  @Get('event/:eventId')
  getRewardsByEvent(@Param('eventId') eventId: string, @Headers('Authorization') authHeader: string) {
    return this.proxyService.get(`/rewards/event/${eventId}`, authHeader);
  }

  @Get(':id')
  getRewardById(@Param('id') id: string, @Headers('Authorization') authHeader: string) {
    return this.proxyService.get(`/rewards/${id}`, authHeader);
  }
}
