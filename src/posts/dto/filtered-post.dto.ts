import { IsString, MinLength, IsOptional } from 'class-validator';

export class FilteredPostDto {
  @IsOptional()
  @IsString()
  @MinLength(6)
  content?: string;
}
