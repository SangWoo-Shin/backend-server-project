import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { RewardStatus } from '../types/reward-status.enum';

@Schema({ timestamps: true })
export class RewardRequest extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Event', required: true })
  eventId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Reward', required: true })
  rewardId: Types.ObjectId;

  @Prop({ type: String, enum: RewardStatus, default: RewardStatus.PENDING })
  status: RewardStatus;

  @Prop({ default: Date.now })
  requestedAt: Date;

  @Prop()
  approvedAt?: Date;
}

export const RewardRequestSchema = SchemaFactory.createForClass(RewardRequest);
export type RewardRequestDocument = RewardRequest;