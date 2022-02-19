import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { Order } from '../entities/order.entity';

import { PizzasService } from 'src/pizzas/services/pizzas.service';

@Injectable()
export class UsersService {
  constructor(
    private pizzaService: PizzasService,
    @InjectModel(User.name) private userModel: Model<User>,
    //@Inject('API_KEY') private apiKey: string,
    //private configService: ConfigService,
  ) { }
  // private counterUserId: number = 1;
  // private users: User[] = [
  //   {
  //     id: 1,
  //     firstName: 'David',
  //     lastName: 'Balladares',
  //     email: 'david@gmail.com',
  //     password: 'Delicouspizza',
  //   },
  // ];

  async findAll() {
    return this.userModel.find().exec();
  }
  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not Found`);
    }
    return user;
  }

  // create(payload: CreateUserDto) {
  //   this.counterUserId++;
  //   const newUser: User = {
  //     id: this.counterUserId,
  //     ...payload,
  //   };
  //   this.users.push(newUser);
  //   return newUser;
  // }
  // update(id: number, payload: UpdateUserDto) {
  //   const user: User = this.findOne(id);
  //   const index: number = this.users.findIndex((user) => user.id === id);
  //   this.users[index] = {
  //     ...user,
  //     ...payload,
  //   };
  //   return this.users[index];
  // }
  // delete(id: number) {
  //   const user: User = this.users.find((item) => item.id === id);
  //   if (!user) {
  //     throw new NotFoundException(`User ${id} not Found`);
  //   }
  //   this.users = this.users.filter((user) => user.id != id);

  //   return this.users;
  // }
  async getOrderByUser(id: string) {
    const user = await this.findOne(id);
    return {
      date: new Date(),
      user,
      pizzas: await this.pizzaService.findAll(),
    };
  }
}
