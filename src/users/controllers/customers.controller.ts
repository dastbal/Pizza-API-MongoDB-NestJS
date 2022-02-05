import {
    Controller,
    HttpCode,
    HttpStatus,
    Delete,
    Put,
    Get,
    Query,
    Param,
    Post,
    Body,
    ParseIntPipe,
} from '@nestjs/common';
import { CustomersService } from 'src/users/services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/users/dtos/customers.dto';

@Controller('customers')
export class CustomersController {
    constructor(private customerService: CustomersService) { }
    @Get(':customerId')
    getPizza(@Param('customerId', ParseIntPipe) customerId: number) {
        return this.customerService.findOne(customerId);
    }

    @Get()
    getPizzas(
        @Query('limit') limit: number = 10,
        @Query('offset') offset: number = 0,
    ) {
        return this.customerService.findAll();

    }

    @Post()
    @HttpCode(HttpStatus.ACCEPTED)
    create(@Body() payload: CreateCustomerDto) {
        return this.customerService.create(payload);

    }
    @Put(':customerId')
    update(@Param('customerId', ParseIntPipe) customerId: number, @Body() payload: UpdateCustomerDto) {
        return this.customerService.update(customerId, payload);

    }
    @Delete(':customerId')
    delete(@Param('customerId', ParseIntPipe) customerId: number) {
        return this.customerService.delete(customerId);

    }
}
