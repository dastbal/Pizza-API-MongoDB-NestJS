import {
  IsMongoId,
  IsNotEmpty,
  IsDate,
  IsArray,
  isNotEmpty,
} from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly customer: string;

  @IsDate()
  @IsNotEmpty()
  readonly date: Date;
  
  @IsArray()
  @IsNotEmpty()
  readonly pizzas: string[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['pizzas']),
  ) {}
  
  export class AddPizzasToOrderDto {
    @IsArray()
    @IsNotEmpty()
    readonly pizzaIds: string[];
  }
  