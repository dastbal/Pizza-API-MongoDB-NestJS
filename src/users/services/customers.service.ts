import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';

import { Customer } from '../entities/customer.entity';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
  FilterCustomerDto,
} from 'src/users/dtos/customers.dto';
import { Order } from '../entities/order.entity';

import { PizzasService } from 'src/pizzas/services/pizzas.service';

@Injectable()
export class CustomersService {
  constructor(
    private pizzaService: PizzasService,
    @InjectModel(Customer.name) private CustomerModel: Model<Customer>,
  ) //@Inject('API_KEY') private apiKey: string,
  //private configService: ConfigService,
  {}
  // private counterCustomerId: number = 1;
  // private Customers: Customer[] = [
  //   {
  //     id: 1,
  //     firstName: 'David',
  //     lastName: 'Balladares',
  //     email: 'david@gmail.com',
  //     password: 'Delicouspizza',
  //   },
  // ];

  async findAll(params?: FilterCustomerDto) {
    if (params) {
      const { limit, offset } = params;

      return this.CustomerModel.find().skip(offset).limit(limit).exec();
    }
    return this.CustomerModel.find().exec();
  }
  async findOne(id: string) {
    const Customer = await this.CustomerModel.findById(id).exec();
    if (!Customer) {
      throw new NotFoundException(`Customer ${id} not Found`);
    }
    return Customer;
  }

  create(payload: CreateCustomerDto) {
    const newCustomer = new this.CustomerModel(payload);
    return newCustomer.save();
  }
  update(id: string, payload: UpdateCustomerDto) {
    const Customer = this.CustomerModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    ).exec();
    if (!Customer) {
      throw new NotFoundException(`Customer #${id} not Found`);
    }

    return Customer;
  }
  delete(id: string) {
    return this.CustomerModel.findByIdAndDelete(id);
  }
  async getOrderByCustomer(id: string) {
    const Customer = await this.findOne(id);
    return {
      date: new Date(),
      Customer,
      pizzas: await this.pizzaService.findAll(),
    };
  }
}
