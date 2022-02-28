import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';
import { PizzasModule } from 'src/pizzas/pizzas.module';

import { User, UserSchema } from 'src/users/entities/user.entity';
import { Order, OrderSchema } from 'src/users/entities/order.entity';
import { Customer, CustomerSchema } from 'src/users/entities/customer.entity';
import { OrdersService } from './services/orders.service';
import { OrdersController } from './controllers/orders.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema, 
      },
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
    ]),
    PizzasModule,
  ],
  controllers: [UsersController, CustomersController, OrdersController],
  providers: [UsersService, CustomersService, OrdersService],
  exports: [UsersService],
})
export class UsersModule {}
