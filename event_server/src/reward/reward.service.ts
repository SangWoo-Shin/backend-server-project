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

  async createReward(createRewardDto: CreateRewardDto): Promise<Reward> {
    const reward = new this.rewardModel(createRewardDto);
    return reward.save();
  }

  async findAll(): Promise<Reward[]> {
    return this.rewardModel.find().populate('eventId');
  }

  async findByEventId(eventId: string): Promise<Reward[]> {
    return this.rewardModel.find({ eventId: eventId });
  }

  async findById(id: string): Promise<Reward | null> {
    return this.rewardModel.findById(id).populate('eventId');
  }
}