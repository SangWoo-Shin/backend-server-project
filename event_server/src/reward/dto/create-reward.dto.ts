import { IsMongoId, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateRewardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;
  
  @IsNumber()
  quantity: number;

  @IsMongoId()
  eventId: string;
}