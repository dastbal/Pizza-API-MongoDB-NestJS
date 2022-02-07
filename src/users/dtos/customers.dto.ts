import {
    IsString,
    IsEmail,
    IsNotEmpty,
} from 'class-validator';
import { PartialType } from '@nestjs/swagger';




export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
    @IsString()
    @IsNotEmpty()
    readonly password: string;


}
export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {

}