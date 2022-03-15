import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  //Validation decorators
  @IsAlphanumeric() //Checks if the string contains only letters and numbers.
  @MaxLength(10) //Checks if the string's length is not more than given number.
  name: string;
}
