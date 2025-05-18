import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardRequestService } from './reward-request.service';
import { RewardRequestController } from './reward-request.controller';
import { RewardRequest, RewardRequestSchema } from './schemas/reward-request.shema';
import { Event, EventSchema } from '../event/schemas/event.schema';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy/jwt.strategy';

@Module({
  imports: [
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
              secret: 'jwt-secret-key',
              signOptions: { expiresIn: '1h' }
        }),
    MongooseModule.forFeature([
      { name: RewardRequest.name, schema: RewardRequestSchema },
      { name: Event.name, schema: EventSchema },
    ]),
  ],
  controllers: [RewardRequestController],
  providers: [RewardRequestService, JwtStrategy],
})
export class RewardRequestModule {}