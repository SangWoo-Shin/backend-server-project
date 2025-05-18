import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../roles.enum';

export class UpdateUserRoleDto {
  @ApiProperty({
    enum: [UserRole],
    enumName: 'UserRole',
    description: '변경할 사용자 권한',
    example: UserRole.ADMIN,
  })
  @IsEnum(UserRole, { message: '유효한 권한이 아닙니다.' })
  role: UserRole;
}