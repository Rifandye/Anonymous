import { IsOptional, IsString } from 'class-validator';

export class GetUserSearchDto {
  @IsString()
  @IsOptional()
  search: string;
}
