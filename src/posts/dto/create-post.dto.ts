import { IsString, MinLength } from 'class-validator';
import {} from 'class-transformer';

export class CreatePostDto {
  @IsString()
  @MinLength(1)
  content: string;
}
