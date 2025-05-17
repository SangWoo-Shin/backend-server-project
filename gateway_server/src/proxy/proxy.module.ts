import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProxyService } from './proxy.service';
import { AuthProxyController } from './auth.proxy/auth-proxy.controller';
import { RewardProxyController } from './reward.proxy/reward-proxy.controller';
import { RewardRequestProxyController } from './reward-request.proxy/reward-request-proxy.controller';
import { EventProxyController } from './event.proxy/event-proxy.controller';

@Module({
  imports: [HttpModule],
  controllers: [
    AuthProxyController,
    RewardProxyController,
    RewardRequestProxyController,
    EventProxyController,
  ],
  providers: [ProxyService],
})
export class ProxyModule {}
