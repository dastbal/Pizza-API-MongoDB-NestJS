import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Pizza } from '../entities/pizza.entity';
import {
  CreatePizzaDto,
  UpdatePizzaDto,
  FilterPizzaDto,
} from 'src/pizzas/dtos/pizzas.dto';

@Injectable()
export class PizzasService {
  constructor(@InjectModel(Pizza.name) private pizzaModel: Model<Pizza>) {}

  async findAll(params?: FilterPizzaDto) {
    if (params) {
      const filters: FilterQuery<Pizza> = {};
      const { limit, offset, maxPrice, minPrice } = params;
      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice };
      }
      const pizzas = this.pizzaModel
        .find(filters)
        .skip(offset)
        .limit(limit)
        .exec();
      return pizzas;
    }
    return this.pizzaModel.find().populate('created').exec();
  }
  async findOne(id: string) {
    const pizza = await this.pizzaModel.findOne({ _id: id }).exec();
    if (!pizza) {
      throw new NotFoundException(`Pizza ${id} not Found`);
    }
    return pizza;
  }

  create(payload: CreatePizzaDto) {
    const newPizza = new this.pizzaModel(payload);

    return newPizza.save();
  }
  update(id: string, payload: UpdatePizzaDto) {
    const pizza = this.pizzaModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();
    if (!pizza) {
      throw new NotFoundException(`Pizza #${id} not Found`);
    }

    return pizza;
  }
  delete(id: string) {
    return this.pizzaModel.findByIdAndDelete(id);
  }
}
