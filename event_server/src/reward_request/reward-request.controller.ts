import { Controller, Req, Post, Body, Get, Param, Patch, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { RewardRequestService } from './reward-request.service';
import { CreateRewardRequestDto } from './dto/create-reward-request.dto';
import { RewardStatus } from './types/reward-status.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/roles.enum';

@ApiTags('Reward-requests')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reward-requests')
export class RewardRequestController {
  constructor(private readonly rewardRequestService: RewardRequestService) {}

  @ApiOperation({ summary: "보상 요청 - 유저 권한 "})
  @Roles(UserRole.USER)
  @Post()
  async requestReward(
    @Body() dto: CreateRewardRequestDto,
    @Req() req: any,
  ) {
    const user = req.user;
    return this.rewardRequestService.createRequest(dto.eventId, dto.rewardId, user.userId);
  }

  @ApiOperation({ summary: "자신의 보상 요청 내역 - 유저 권한 "})
  @Roles(UserRole.USER)
  @Get('my')
  async getMyRequests(@Req() req: any) {
    const user = req.user;
    return this.rewardRequestService.getUserRequests(user.userId);
  }

  @ApiOperation({ summary: "모든 보상 요청 내역 확인 - 관리자, 운영자 그리고 감사자 권한 "})
  @Roles(UserRole.ADMIN, UserRole.OPERATOR, UserRole.AUDITOR)
  @ApiQuery({ name: 'eventId', required: false, description: '이벤트 ID (선택)' })
  @ApiQuery({ name: 'status', required: false, description: '보상 상태 (PENDING, APPROVED, REJECTED)' })
  @Get('all')
  async getAllRequests(
    @Query('eventId') eventId?: string,
    @Query('status') status?: string,
  ) {
      return this.rewardRequestService.getAllRequests(eventId, status);
  }

  @ApiOperation({ summary: "모든 보상 요청 내역 확인 (상태, 이벤트별 필터링 가능) - 관리자, 운영자 그리고 감사자 권한 "})
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @Patch(':id/status/:status')
  async updateStatus(
    @Param('id') id: string,
    @Param('status') status: RewardStatus,
  ) {
    return this.rewardRequestService.updateStatus(id, status);
  }
}