import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../entities/customer.entity';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from 'src/users/dtos/customers.dto';

@Injectable()
export class CustomersService {
  private counterCustomerId: number = 1;
  private customers: Customer[] = [
    {
      id: 1,
      firstName: 'Super',
      lastName: 'Balladares',
      email: 'david@gmail.com',
      password: 'Delicouspizza',
    },
  ];

  findAll() {
    return this.customers;
  }
  findOne(id: number) {
    const customer: Customer = this.customers.find((item) => item.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer ${id} not Found`);
    }
    return customer;
  }

  create(payload: CreateCustomerDto) {
    this.counterCustomerId++;
    const newCustomer: Customer = {
      id: this.counterCustomerId,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }
  update(id: number, payload: UpdateCustomerDto) {
    const customer: Customer = this.findOne(id);
    const index: number = this.customers.findIndex(
      (customer) => customer.id === id,
    );
    this.customers[index] = {
      ...customer,
      ...payload,
    };
    return this.customers[index];
  }
  delete(id: number) {
    const customer: Customer = this.customers.find((item) => item.id === id);
    if (!customer) {
      throw new NotFoundException(`Customer ${id} not Found`);
    }
    this.customers = this.customers.filter((customer) => customer.id != id);

    return this.customers;
  }
}
