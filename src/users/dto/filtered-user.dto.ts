import { IsString, IsOptional } from 'class-validator';

export class FilteredUserDto {
  @IsOptional()
  @IsString()
  name?: string;
}
