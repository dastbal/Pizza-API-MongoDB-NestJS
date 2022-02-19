import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PizzasController } from './controllers/pizzas.controller';
import { PizzasService } from './services/pizzas.service';
import { Pizza, PizzaSchema } from 'src/pizzas/entities/pizza.entity'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Pizza.name,
        schema: PizzaSchema,

      },
    ]),
  ],
  controllers: [PizzasController],
  providers: [PizzasService],
  exports: [PizzasService],
})
export class PizzasModule { }
