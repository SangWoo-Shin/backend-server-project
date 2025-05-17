import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRewardRequestDto {
  @IsString()
  @IsNotEmpty()
  eventId: string;

  @IsString()
  @IsNotEmpty()
  rewardId: string;
}