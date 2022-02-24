import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  isPositive,
  Min,
  ValidateIf,
  ValidateNested,
  isMongoId,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreatePizzaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: ' The Name of the pizza' })
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: ' The  ingrdients of the pizza' })
  readonly description: string;
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: ' The Url of the image' })
  readonly image: string;
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: ' The price of the pizza' })
  readonly price: number;

  @IsNotEmpty()
  @ApiProperty({ description: ' User that created the pizza' })
  readonly created: string;
}
export class UpdatePizzaDto extends PartialType(CreatePizzaDto) {}
export class FilterPizzaDto {
  @IsOptional()
  @Min(1)
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  @Min(0)
  minPrice: number;

  @ValidateIf((params) => params.minPrice)
  @Min(1)
  maxPrice: number;
}
