import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRewardRequestDto {
  
  @ApiProperty({ example: '이벤트 ID' })
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @ApiProperty({ example: '보상 ID' })
  @IsString()
  @IsNotEmpty()
  rewardId: string;
}