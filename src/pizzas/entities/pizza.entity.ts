import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Pizza extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Number })
  price: number;

  @Prop()
  image: string;
}

export const PizzaSchema = SchemaFactory.createForClass(Pizza);
