import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() => AuthModule),
    JwtModule.register({
        secret: 'jwt-secret-key',
        signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController], 
  providers: [UserService, JwtStrategy, RolesGuard],
  exports: [UserService],
})
export class UserModule {}