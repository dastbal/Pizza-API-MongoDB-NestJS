import {
    IsString,
    IsNumber,
    IsUrl,
    IsNotEmpty,
    IsPositive,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';




export class CreatePizzaDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    @IsString()
    @IsNotEmpty()
    readonly description: string;
    @IsUrl()
    @IsNotEmpty()
    readonly image: string;
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    readonly price: number;

}
export class UpdatePizzaDto extends PartialType(CreatePizzaDto) {

}