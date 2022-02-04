import { Injectable, NotFoundException } from '@nestjs/common';
import { Pizza } from '../../entities/pizza.entity';
import { CreatePizzaDto, UpdatePizzaDto } from 'src/dtos/pizzas.dto';

@Injectable()
export class PizzasService {
    private counterPizzaId: number = 1;
    private pizzas: Pizza[] = [{
        id: 1,
        name: 'Jamon',
        description: 'Delicous pizza',
        price: 10,
        image: '',
    }];

    findAll() {
        return this.pizzas;
    }
    findOne(id: number) {
        const pizza: Pizza = this.pizzas.find((item) => item.id === id);
        if (!pizza) {
            throw new NotFoundException(`Pizza ${id} not Found`);
        }
        return pizza;
    }

    create(payload: CreatePizzaDto) {
        this.counterPizzaId++
        const newPizza: Pizza = {
            id: this.counterPizzaId,
            ...payload,
        };
        this.pizzas.push(newPizza);
        return newPizza;
    }
    update(id: number, payload: UpdatePizzaDto) {
        const pizza: Pizza = this.findOne(id);
        const index: number = this.pizzas.findIndex(pizza => pizza.id === id);
        this.pizzas[index] = {
            ...pizza,
            ...payload,
        };
        return this.pizzas[index];
    }
    delete(id: number) {
        const pizza: Pizza = this.pizzas.find((item) => item.id === id);
        if (!pizza) {
            throw new NotFoundException(`Pizza ${id} not Found`);
        }
        this.pizzas = this.pizzas.filter(pizza => pizza.id != id);

        return this.pizzas
    }

}
