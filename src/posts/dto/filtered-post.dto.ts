import { IsString, MinLength, IsOptional } from 'class-validator';

export class FilteredPostDto {
  @IsOptional()
  @IsString()
  @MinLength(4)
  content?: string;
}
