import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { User } from '../entities/user.entity';
import {
  CreateUserDto,
  UpdateUserDto,
  FilterUserDto,
} from 'src/users/dtos/users.dto';
import { Order } from '../entities/order.entity';

import { PizzasService } from 'src/pizzas/services/pizzas.service';

@Injectable()
export class UsersService {
  constructor(
    private pizzaService: PizzasService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) //@Inject('API_KEY') private apiKey: string,
  //private configService: ConfigService,
  {}
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

  async findAll(params?: FilterUserDto) {
    if (params) {
      const { limit, offset } = params;

      return this.userModel.find().skip(offset).limit(limit).exec();
    }
    return this.userModel.find().exec();
  }
  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not Found`);
    }
    return user;
  }

  create(payload: CreateUserDto) {
    const newUser = new this.userModel(payload);
    return newUser.save();
  }
  update(id: string, payload: UpdateUserDto) {
    const user = this.userModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!user) {
      throw new NotFoundException(`user #${id} not Found`);
    }

    return user;
  }
  delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }
  async getOrderByUser(id: string) {
    const user = await this.findOne(id);
    return {
      date: new Date(),
      user,
      pizzas: await this.pizzaService.findAll(),
    };
  }
}
