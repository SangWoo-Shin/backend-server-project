import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true })
export class Event extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  // 이벤트 보상을 위한 조건
  @Prop({ required: true })
  condition: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ default: true })
  isActive: boolean;
}

export const EventSchema = SchemaFactory.createForClass(Event);