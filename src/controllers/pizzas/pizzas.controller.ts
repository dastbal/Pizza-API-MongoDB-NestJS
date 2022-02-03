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

@Controller('pizzas')
export class PizzasController {
    @Get(':pizzaId')
    getPizza(@Param('pizzaId') pizzaId: string) {
        return ` pizza ${pizzaId}`;
    }

    @Get()
    getPizzas(
        @Query('limit') limit: number = 10,
        @Query('offset') offset: number = 0,
        @Query('brand') brand: string,
    ) {
        return {
            message: `pizzas: limit => ${limit} offset => ${offset} our  brand is ${brand}`,
        };
    }

    @Post()
    @HttpCode(HttpStatus.ACCEPTED)
    create(@Body() payload: any) {
        return {
            message: 'Created',
            payload,
        };
    }
    @Put(':pizzaId')
    update(@Param('pizzaId') pizzaId: number, @Body() payload: any) {
        return {
            message: 'updated',
            pizzaId: pizzaId,
            payload,
        };
    }
    @Delete(':pizzaId')
    delete(@Param('pizzaId') pizzaId: number) {
        return {
            message: ' Deleted',
            pizzaId: pizzaId,
        };
    }
}
