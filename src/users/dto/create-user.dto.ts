import {
  IsString,
  IsNotEmpty,
  IsNumber,
  MinLength,
  Min,
  Max,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(8)
  @Max(100)
  age: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak!',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, {
    message: 'Invalid email!',
  })
  email: string;
}
