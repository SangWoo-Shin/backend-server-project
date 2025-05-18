import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy/jwt.strategy';
import { HttpModule } from '@nestjs/axios';
import { ProxyService } from './proxy/proxy.service';
import { ProxyModule } from './proxy/proxy.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwt-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    HttpModule,
    ProxyModule,
  ],
  controllers: [],
  providers: [JwtStrategy, ProxyService],
})
export class AppModule {}