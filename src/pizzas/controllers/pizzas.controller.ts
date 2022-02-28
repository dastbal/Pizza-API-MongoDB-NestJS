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
  UseGuards,
} from '@nestjs/common';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { PizzasService } from 'src/pizzas/services/pizzas.service';
import {
  CreatePizzaDto,
  UpdatePizzaDto,
  FilterPizzaDto,
} from 'src/pizzas/dtos/pizzas.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@UseGuards(JwtAuthGuard)
@ApiTags('Pizzas')
@Controller('pizzas')
export class PizzasController {
  constructor(private pizzasService: PizzasService) {}
  @Public()
  @Get(':pizzaId')
  @ApiOperation({ summary: 'get a pizza by id' })
  getPizza(@Param('pizzaId', MongoIdPipe) pizzaId: string) {
    return this.pizzasService.findOne(pizzaId);
  }
  
  @Public()
  @Get()
  getPizzas(@Query() params: FilterPizzaDto) {
    return this.pizzasService.findAll(params);
  }

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  create(@Body() payload: CreatePizzaDto) {
    return this.pizzasService.create(payload);
  }
  @Put(':pizzaId')
  update(
    @Param('pizzaId', MongoIdPipe) pizzaId: string,
    @Body() payload: UpdatePizzaDto,
  ) {
    return this.pizzasService.update(pizzaId, payload);
  }
  @Delete(':pizzaId')
  delete(@Param('pizzaId', MongoIdPipe) pizzaId: string) {
    return this.pizzasService.delete(pizzaId);
  }
}
