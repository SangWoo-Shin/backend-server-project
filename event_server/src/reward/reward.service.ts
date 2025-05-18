import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reward, RewardDocument } from './schemas/reward.schema';
import { CreateRewardDto } from './dto/create-reward.dto';

@Injectable()
export class RewardService {
  constructor(
    @InjectModel(Reward.name) private readonly rewardModel: Model<RewardDocument>,
  ) {}

  // 보상 생성
  async createReward(createRewardDto: CreateRewardDto): Promise<Reward> {
    const reward = new this.rewardModel(createRewardDto);
    return reward.save();
  }

  // 모든 보상에 접근
  async findAll(): Promise<Reward[]> {
    return this.rewardModel.find().populate('eventId');
  }

  // 이벤트 ID로 보상에 접근
  async findByEventId(eventId: string): Promise<Reward[]> {
    return this.rewardModel.find({ eventId: eventId });
  }

  // 보상 ID로 보상에 접근
  async findById(id: string): Promise<Reward | null> {
    return this.rewardModel.findById(id).populate('eventId');
  }
}