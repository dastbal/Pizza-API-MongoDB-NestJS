import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { OrdersService } from '../services/orders.service';
import { CreateOrderDto, UpdateOrderDto ,AddPizzasToOrderDto } from '../dtos/orders.dto';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.ordersService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateOrderDto) {
    return this.ordersService.update(id, payload);
  }
  @Put(':orderId/pizzas')
  updatePizzas(
    @Param('orderId', MongoIdPipe) OrderId: string, 
    @Body() payload: AddPizzasToOrderDto,
  ) {
    return this.ordersService.addPizza(OrderId,  payload.pizzaIds );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(id);
  }
  @Delete(':orderId/pizzas/:pizzaId')
  removePizza(
    @Param('orderId', MongoIdPipe) orderId: string,
    @Param('pizzaId', MongoIdPipe) pizzaId: string,
    ) {
    return this.ordersService.removePizza(orderId, pizzaId);
  }
}
