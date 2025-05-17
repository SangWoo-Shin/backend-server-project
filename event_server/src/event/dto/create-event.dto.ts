import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  condition: string;

  @IsString()
  period: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}