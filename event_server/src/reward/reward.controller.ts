import { Controller, Headers, Post, Body, Get, Param, ForbiddenException } from '@nestjs/common';
import { RewardService } from './reward.service';
import { CreateRewardDto } from './dto/create-reward.dto';
import { Reward } from './schemas/reward.schema';
import { verifyUser } from 'src/utils/verifyUser';

@Controller('rewards')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post()
  async createReward(
    @Body() createRewardDto: CreateRewardDto,
    @Headers('Authorization') authHeader: string, 
  ): Promise<Reward> {
    const user = await verifyUser(authHeader);
    if(!['ADMIN', 'OPERATOR'].includes(user.role)) {
        throw new ForbiddenException('권한이 없습니다.');
    }

    return this.rewardService.createReward(createRewardDto);
  }

  @Get()
  async getAllRewards(@Headers('Authorization') authHeader: string): Promise<Reward[]> {
    const user = await verifyUser(authHeader);
    if (!['ADMIN', 'OPERATOR', 'AUDITOR'].includes(user.role)) {
        throw new ForbiddenException('권한이 없습니다.');
    }
      return this.rewardService.findAll();
  }

  @Get('event/:eventId')
  async getRewardsByEvent(
    @Param('eventId') eventId: string,
    @Headers('Authorization') authHeader: string,
  ): Promise<Reward[]> {
    const user = await verifyUser(authHeader);
    if (!['ADMIN', 'OPERATOR', 'AUDITOR'].includes(user.role)) {
        throw new ForbiddenException('권한이 없습니다.');
    }
      return this.rewardService.findByEventId(eventId);
  }

  @Get(':id')
  async getRewardById(
    @Param('id') id: string,
    @Headers('Authorization') authHeader: string,
  ): Promise<Reward | null> {
    const user = await verifyUser(authHeader);
    if (!['ADMIN', 'OPERATOR', 'AUDITOR'].includes(user.role)) {
        throw new ForbiddenException('권한이 없습니다.');
    }
      return this.rewardService.findById(id);
  }
}