import { Pizza } from 'src/pizzas/entities/pizza.entity';
import { User } from './user.entity';

export class Order {
    date: Date;
    user: User;
    pizzas: Pizza[];
}
