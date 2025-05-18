import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: '10주년 이벤트' })
  @IsString()
  title: string;

  @ApiProperty({ example: '이벤트 설명입니다.' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'LOGIN_FOR_1_HOUR' })
  @IsString()
  condition: string;

  @ApiProperty({ example: '2025-05-01T00:00:00.000Z' })
  startDate: Date;

  @ApiProperty({ example: '2025-06-01T00:00:00.000Z' })
  endDate: Date;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}