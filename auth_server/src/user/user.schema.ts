import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from './roles.enum';

@Schema({ timestamps: true })
export class User extends Document {
    // 유저 이메일
    @Prop({ required: true, unique: true })
    email: string;

    // 유저 비밀번호
    @Prop({ required: true })
    password: string;

    // 유저 권한
    @Prop({ enum: UserRole, default: UserRole.USER })
    role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);