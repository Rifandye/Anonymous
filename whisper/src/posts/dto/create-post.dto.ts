import { IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  image: string;

  @IsString()
  description: string;
}
