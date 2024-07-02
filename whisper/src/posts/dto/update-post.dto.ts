import { IsOptional, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  description: string;
}
