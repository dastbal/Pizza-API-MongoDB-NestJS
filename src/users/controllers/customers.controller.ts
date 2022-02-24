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
} from '@nestjs/common';
import { CustomersService } from 'src/users/services/customers.service';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
  FilterCustomerDto,
} from 'src/users/dtos/customers.dto';
import { ApiTags } from '@nestjs/swagger';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('Customers')
@Controller('customers')
export class CustomersController {
  constructor(private customerService: CustomersService) {}
  @Get(':customerId')
  getCustomer(@Param('customerId', MongoIdPipe) customerId: string) {
    return this.customerService.findOne(customerId);
  }

  @Get()
  getCustomers(@Query() params: FilterCustomerDto) {
    return this.customerService.findAll(params);
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() payload: CreateCustomerDto) {
    return this.customerService.create(payload);
  }
  @Put(':customerId')
  update(
    @Param('customerId', MongoIdPipe) customerId: string,
    @Body() payload: UpdateCustomerDto,
  ) {
    return this.customerService.update(customerId, payload);
  }
  @Delete(':customerId')
  delete(@Param('customerId', MongoIdPipe) customerId: string) {
    return this.customerService.delete(customerId);
  }
}
