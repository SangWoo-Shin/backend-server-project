import { Controller, ForbiddenException, Headers, Post, Body, Get, Param, Patch, Query, UseGuards, Request } from '@nestjs/common';
import { RewardRequestService } from './reward-request.service';
import { CreateRewardRequestDto } from './dto/create-reward-request.dto';
import { verifyUser } from 'src/utils/verifyUser';
import { RewardStatus } from './types/reward-status.enum';

@Controller('reward-requests')
export class RewardRequestController {
  constructor(private readonly rewardRequestService: RewardRequestService) {}

  // 유저가 보상 요청
  @Post()
  async requestReward(
    @Body() dto: CreateRewardRequestDto,
    @Headers('Authorization') authHeader: string,
  ) {
    const user = await verifyUser(authHeader);
    if (user.role !== 'USER') {
      throw new ForbiddenException('권한이 없습니다.');
    }
    return this.rewardRequestService.createRequest(dto.eventId, dto.rewardId, user.userId);
  }

  // 유저 자신의 보상 요청 내역
  @Get('my')
  async getMyRequests(@Headers('Authorization') authHeader: string) {
    const user = await verifyUser(authHeader);
    if (user.role !== 'USER') {
      throw new ForbiddenException('권한이 없습니다.');
    }
    return this.rewardRequestService.getUserRequests(user.userId);
  }

  // 관리자/감사 @Get()
  @Get('all')
  async getAllRequests(
    @Headers('Authorization') authHeader: string,
    @Query('eventId') eventId?: string,
    @Query('status') status?: string,
  ) {
    const user = await verifyUser(authHeader);
    if (!['ADMIN', 'OPERATOR', 'AUDITOR'].includes(user.role)) {
      throw new ForbiddenException('권한이 없습니다.');
    }
      return this.rewardRequestService.getAllRequests(eventId, status);
  }

  // 요청 상태 변경
  @Patch(':id/status/:status')
  async updateStatus(
    @Param('id') id: string,
    @Param('status') status: RewardStatus,
    @Headers('Authorization') authHeader: string,
  ) {
    const user = await verifyUser(authHeader);
    if (!['ADMIN', 'OPERATOR'].includes(user.role)) {
      throw new ForbiddenException('권한이 없습니다.');
    }
    return this.rewardRequestService.updateStatus(id, status);
  }
}