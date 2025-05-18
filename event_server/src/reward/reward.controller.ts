import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { Reward } from './schemas/reward.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/roles.enum';

@ApiTags('Rewards')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('rewards')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @ApiOperation({ summary: "신규 보상 생성 - 관리자 또는 운영자만 가능"})
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @Post()
  async createReward( @Body() createRewardDto: CreateRewardDto ): Promise<Reward> {
    return this.rewardService.createReward(createRewardDto);
  }

  @ApiOperation({ summary: "모든 보상목록 조회 - 관리자, 운영자, 감사자 권한"})
  @Roles(UserRole.ADMIN, UserRole.OPERATOR, UserRole.AUDITOR)
  @Get()
  async getAllRewards(): Promise<Reward[]> {
    return this.rewardService.findAll();
  }

  @ApiOperation({ summary: "이벤트 ID로 보상정보 조회 - 관리자, 운영자, 감사자 권한"})
  @Roles(UserRole.ADMIN, UserRole.OPERATOR, UserRole.AUDITOR)
  @Get('event/:eventId')
  async getRewardsByEvent( @Param('eventId') eventId: string ): Promise<Reward[]> {
    return this.rewardService.findByEventId(eventId);
  }

  @ApiOperation({ summary: "보상 ID로 보상정보 조회 - 관리자, 운영자, 감사자 권한"})
  @Roles(UserRole.ADMIN, UserRole.OPERATOR, UserRole.AUDITOR)
  @Get(':id')
  async getRewardById( @Param('id') id: string ): Promise<Reward | null> {
    return this.rewardService.findById(id);
  }
}