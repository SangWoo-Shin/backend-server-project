import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventModule } from './event/event.module';
import { RewardModule } from './reward/reward.module';
import { RewardRequestModule } from './reward_request/reward-request.module';
import { ExternalAuthModule } from './auth/auth.module'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    EventModule,
    RewardModule,
    RewardRequestModule,
    ExternalAuthModule,
  ],
  providers: [],
})
export class AppModule {}