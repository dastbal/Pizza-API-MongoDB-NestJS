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
import { PizzasService } from 'src/pizzas/services/pizzas.service';
import { CreatePizzaDto, UpdatePizzaDto } from 'src/pizzas/dtos/pizzas.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Pizzas')
@Controller('pizzas')
export class PizzasController {
  constructor(private pizzasService: PizzasService) {}
  @Get(':pizzaId')
  @ApiOperation({ summary: 'get a pizza by id' })
  getPizza(@Param('pizzaId', ParseIntPipe) pizzaId: number) {
    return this.pizzasService.findOne(pizzaId);
  }

  @Get()
  getPizzas(
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string,
  ) {
    return this.pizzasService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() payload: CreatePizzaDto) {
    return this.pizzasService.create(payload);
  }
  @Put(':pizzaId')
  update(
    @Param('pizzaId', ParseIntPipe) pizzaId: number,
    @Body() payload: UpdatePizzaDto,
  ) {
    return this.pizzasService.update(pizzaId, payload);
  }
  @Delete(':pizzaId')
  delete(@Param('pizzaId', ParseIntPipe) pizzaId: number) {
    return this.pizzasService.delete(pizzaId);
  }
}
