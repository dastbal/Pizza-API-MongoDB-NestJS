import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Customer extends Document {
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true, index: true })
  email: string;
  @Prop({ required: true })
  password: string;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);
CustomerSchema.index({ email: 1 });
