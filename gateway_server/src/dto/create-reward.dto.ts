import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateRewardDto {
  @ApiProperty({ example: '한정판 코스튬 뽑기권' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '뽑기 쿠폰' })
  @IsString()
  @IsNotEmpty()
  type: string;
  
  @ApiProperty({ example: '1' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: '이벤트 ID' })
  @IsMongoId()
  eventId: string;
}