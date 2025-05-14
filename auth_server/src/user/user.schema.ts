import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
    USER = 'USER',
    OPERATOR = 'OPERATOR',
    AUDITOR = 'AUDITOR',
    ADMIN = 'ADMIN',
}

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ enum: UserRole, default: UserRole.USER })
    role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);