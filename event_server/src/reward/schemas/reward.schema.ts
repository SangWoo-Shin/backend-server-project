import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type RewardDocument = Reward & Document;

@Schema({ timestamps: true })
export class Reward {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: Types.ObjectId;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);