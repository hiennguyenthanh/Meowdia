import { IsString, IsNotEmpty } from 'class-validator';
export class SignInUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
