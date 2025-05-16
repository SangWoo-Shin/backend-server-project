import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../../user/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    console.log('👤 현재 유저:', user);
    if (!user) {
        throw new ForbiddenException('인증된 사용자가 아닙니다.');
    }

    if (!requiredRoles.includes(user.role)) {
        throw new ForbiddenException(`권한 부족: ${requiredRoles.join(', ')}만 접근 가능합니다.`);
    }

    return requiredRoles.includes(user.role);
  }
}