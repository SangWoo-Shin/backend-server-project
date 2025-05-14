import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userData: Partial<User>): Promise<User> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async createUser(email: string, password: string): Promise<User> {
    const existingUser = await this.userModel.findOne({ email });
    if(existingUser) {
        throw new Error('이미 존재하는 이메일입니다.');
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const createdUser = new this.userModel({ email, password: hashedPassword });
    return createdUser.save();  
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.findByEmail(email);
    if(!user) {
        throw new Error('존재하지 않는 사용자입니다.');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error('비밀번호가 일치하지 않습니다.');
    }

    return user;
  }
}