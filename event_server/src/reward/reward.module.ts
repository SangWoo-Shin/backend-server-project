import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reward, RewardSchema } from './schemas/reward.schema';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
        {name: Reward.name, schema: RewardSchema},
    ]),
  ],
  providers: [RewardService],
  controllers: [RewardController],
  exports: [RewardService],
})
export class RewardModule {}