import { Module } from '@nestjs/common';
import { PizzasController } from './controllers/pizzas.controller';
import { PizzasService } from './services/pizzas.service';

@Module({
    controllers: [PizzasController],
    providers: [PizzasService],
    exports: [PizzasService],
})
export class PizzasModule { }
