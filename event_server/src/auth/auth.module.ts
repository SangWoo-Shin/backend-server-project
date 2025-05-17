import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExternalAuthService } from './auth.service';

@Module({
  imports: [HttpModule],
  providers: [ExternalAuthService],
  exports: [ExternalAuthService],
})
export class ExternalAuthModule {}