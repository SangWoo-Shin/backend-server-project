import { Controller, Post, Body, Get, Param, Patch, Req, Query, UseGuards } from '@nestjs/common';
import { ProxyService } from '../proxy.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateRewardRequestDto } from 'src/dto/create-reward-request.dto';

@ApiTags('Reward-requests')
@ApiBearerAuth()
@Controller('reward-requests')
@UseGuards(JwtAuthGuard)
export class RewardRequestProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @ApiOperation({ summary: "보상 요청 - 유저 권한 "})
  @Post()
  createRequest(@Body() body: CreateRewardRequestDto, @Req() req: Request) {
    const token = req.headers['authorization'];
    return this.proxyService.post('/reward-requests', body, token);
  }

  @ApiOperation({ summary: "자신의 보상 요청 내역 - 유저 권한 "})
  @Get('my')
  getMyRequests(@Req() req: Request) {
    const token = req.headers['authorization'];
    return this.proxyService.get('/reward-requests/my', token);
  }

  @ApiOperation({ summary: "모든 보상 요청 내역 확인 (상태, 이벤트별 필터링 가능) - 관리자, 운영자 그리고 감사자 권한 "})
  @ApiQuery({ name: 'eventId', required: false, description: '이벤트 ID로 필터링' })
  @ApiQuery({ name: 'status', required: false, description: '보상 상태로 필터링 (PENDING, APPROVED, REJECTED)' })
  @Get('all')
  getAllRequests(
    @Req() req: Request,
    @Query('eventId') eventId?: string,
    @Query('status') status?: string,
  ) {
    const query = new URLSearchParams();
    if (eventId) query.append('eventId', eventId);
    if (status) query.append('status', status);
    const token = req.headers['authorization'];
    return this.proxyService.get(`/reward-requests/all?${query.toString()}`, token);
  }

  @ApiOperation({ summary: "요청 상태 변경 - 관리자 그리고 운영자 권한 "})
  @Patch(':id/status/:status')
  updateStatus(
    @Param('id') id: string,
    @Param('status') status: string,
    @Req() req: Request,
  ) {
    const token = req.headers['authorization'];
    return this.proxyService.patch(`/reward-requests/${id}/status/${status}`, {}, token);
  }
}