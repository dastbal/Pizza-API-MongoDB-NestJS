import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { CustomersController } from './controllers/customers.controller';
import { PizzasModule } from 'src/pizzas/pizzas.module';

import { User, UserSchema } from 'src/users/entities/user.entity'


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ])
    ,
    PizzasModule],
  controllers: [UsersController, CustomersController],
  providers: [UsersService, CustomersService],
})
export class UsersModule { }
