import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/users.dto';
import { Order } from '../entities/order.entity';

import { PizzasService } from 'src/pizzas/services/pizzas.service'

@Injectable()
export class UsersService {
    constructor(
        private pizzaService: PizzasService,
        @Inject('API_KEY') private apiKey: string,
        private configService: ConfigService,
    ) { }
    private counterUserId: number = 1;
    private users: User[] = [{
        id: 1,
        firstName: 'David',
        lastName: 'Balladares',
        email: "david@gmail.com",
        password: 'Delicouspizza',
    }];

    findAll() {
        console.log(this.configService.get('DATABASE_NAME'));
        return this.users;
    }
    findOne(id: number) {
        const user: User = this.users.find((item) => item.id === id);
        if (!user) {
            throw new NotFoundException(`User ${id} not Found`);
        }
        return user;
    }

    create(payload: CreateUserDto) {
        this.counterUserId++
        const newUser: User = {
            id: this.counterUserId,
            ...payload,
        };
        this.users.push(newUser);
        return newUser;
    }
    update(id: number, payload: UpdateUserDto) {
        const user: User = this.findOne(id);
        const index: number = this.users.findIndex(user => user.id === id);
        this.users[index] = {
            ...user,
            ...payload,
        };
        return this.users[index];
    }
    delete(id: number) {
        const user: User = this.users.find((item) => item.id === id);
        if (!user) {
            throw new NotFoundException(`User ${id} not Found`);
        }
        this.users = this.users.filter(user => user.id != id);

        return this.users
    }
    getOrderByUser(id: number): Order {
        const user: User = this.findOne(id);
        return {
            date: new Date(),
            user,
            pizzas: this.pizzaService.findAll(),

        };


    }

}

