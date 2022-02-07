import {
    IsString,
    IsNumber,
    IsUrl,
    IsNotEmpty,
    IsPositive,
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

}
export class UpdatePizzaDto extends PartialType(CreatePizzaDto) {

}