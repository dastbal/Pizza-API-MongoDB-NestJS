import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Min,
  IsOptional,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: ' The first name of the user' })
  readonly firstName: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: ' The last name of the user' })
  readonly lastName: string;
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: ' The email  of the user need to be unique' })
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'A strong password' })
  readonly password: string;
}
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

export class FilterCustomerDto {
  @IsOptional()
  @Min(1)
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}
