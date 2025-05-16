import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum RequestStatus {
  PENDING = 'PENDING',     
  APPROVED = 'APPROVED',   
  REJECTED = 'REJECTED', 
}

@Schema({ timestamps: true })
export class RequestHistory extends Document {
  @Prop({ required: true })
  userId: string;  

  @Prop({ required: true, type: Types.ObjectId, ref: 'Event' })
  eventId: Types.ObjectId;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Reward' })
  rewardId: Types.ObjectId;

  @Prop({ enum: RequestStatus, default: RequestStatus.PENDING })
  status: RequestStatus;

  @Prop()
  message: string;
}

export const RequestHistorySchema = SchemaFactory.createForClass(RequestHistory);