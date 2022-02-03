import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PizzasController } from './controllers/pizzas/pizzas.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { UsersController } from './controllers/users/users.controller';
import { PizzasService } from './services/pizzas/pizzas.service';

@Module({
  imports: [],
  controllers: [AppController, PizzasController, CategoriesController, UsersController],
  providers: [AppService, PizzasService],
})
export class AppModule {}
