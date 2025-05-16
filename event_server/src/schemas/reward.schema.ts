import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Reward extends Document {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Event' })
  eventId: Types.ObjectId;

  // 보상 종류 (포인트, 아이템, 쿠폰등)
  @Prop({ required: true })

  @Prop({ required: true })
  amount: number;

  @Prop()
  description: string;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);