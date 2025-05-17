import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardRequestService } from './reward-request.service';
import { RewardRequestController } from './reward-request.controller';
import { RewardRequest, RewardRequestSchema } from './schemas/reward-request.shema';
import { Event, EventSchema } from '../event/schemas/event.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: RewardRequest.name, schema: RewardRequestSchema },
      { name: Event.name, schema: EventSchema },
    ]),
  ],
  controllers: [RewardRequestController],
  providers: [RewardRequestService],
})
export class RewardRequestModule {}