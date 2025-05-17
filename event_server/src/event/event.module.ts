import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './schemas/event.schema';
import { Reward, RewardSchema } from '../reward/schemas/reward.schema';
import { RewardRequest, RewardRequestSchema } from '../reward_request/schemas/reward-request.shema';
import { EventService } from './event.service';
import { EventController } from './event.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventSchema },
      { name: Reward.name, schema: RewardSchema },
      { name: RewardRequest.name, schema: RewardRequestSchema },
    ]),
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}