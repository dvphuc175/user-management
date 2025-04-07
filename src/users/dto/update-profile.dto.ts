import { IsOptional, IsString, IsEmail, IsNumber } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name?: string;
  
  @IsOptional()
  @IsNumber()
  age?: number;

}