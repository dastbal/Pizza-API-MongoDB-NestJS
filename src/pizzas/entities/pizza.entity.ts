import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { User } from 'src/users/entities/user.entity';

@Schema()
export class Pizza extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: Number, index: true })
  price: number;

  @Prop()
  image: string;

  @Prop({ type: Types.ObjectId, ref: User.name })
  created: User | Types.ObjectId;
}

export const PizzaSchema = SchemaFactory.createForClass(Pizza);
PizzaSchema.index({ price: 1 });
