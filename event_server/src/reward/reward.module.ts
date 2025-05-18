import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reward, RewardSchema } from './schemas/reward.schema';
import { RewardService } from './reward.service';
import { RewardController } from './reward.controller';
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
        {name: Reward.name, schema: RewardSchema},
    ]),
  ],
  providers: [RewardService, JwtStrategy],
  controllers: [RewardController],
  exports: [RewardService],
})
export class RewardModule {}