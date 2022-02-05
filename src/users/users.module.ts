import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';
import { PizzasModule } from 'src/pizzas/pizzas.module';

@Module({
  imports: [PizzasModule],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService]
})
export class UsersModule { }
