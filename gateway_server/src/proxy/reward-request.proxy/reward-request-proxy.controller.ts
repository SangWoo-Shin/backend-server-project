import { Controller, Post, Body, Get, Param, Patch, Headers, Query, UseGuards } from '@nestjs/common';
import { ProxyService } from '../proxy.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('reward-requests')
@UseGuards(JwtAuthGuard)
export class RewardRequestProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post()
  createRequest(@Body() body: any, @Headers('Authorization') authHeader: string) {
    return this.proxyService.post('/reward-requests', body, authHeader);
  }

  @Get('my')
  getMyRequests(@Headers('Authorization') authHeader: string) {
    return this.proxyService.get('/reward-requests/my', authHeader);
  }

  @Get('all')
  getAllRequests(
    @Query('eventId') eventId: string,
    @Query('status') status: string,
    @Headers('Authorization') authHeader: string,
  ) {
    const query = new URLSearchParams();
    if (eventId) query.append('eventId', eventId);
    if (status) query.append('status', status);
    return this.proxyService.get(`/reward-requests/all?${query.toString()}`, authHeader);
  }

  @Patch(':id/status/:status')
  updateStatus(
    @Param('id') id: string,
    @Param('status') status: string,
    @Headers('Authorization') authHeader: string,
  ) {
    return this.proxyService.patch(`/reward-requests/${id}/status/${status}`, {}, authHeader);
  }
}