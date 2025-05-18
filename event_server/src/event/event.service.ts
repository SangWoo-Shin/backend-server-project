import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
  ) {}

  // 이벤트 생성
  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = new this.eventModel(createEventDto);
    return newEvent.save();
  }

  // 모든 이벤트 접근
  async getAllEvents(): Promise<Event[]> {
    return this.eventModel.find();
  }

  // 이벤트 ID로 해당 이벤트 접근
  async getEventById(id: string): Promise<Event | null> {
    return this.eventModel.findById(id);
  }

  // 이벤트 비활성화
  async deactivateEvent(id: string): Promise<Event> {
    const event = await this.eventModel.findById(id);
    if (!event) {
      throw new NotFoundException('해당 이벤트를 찾을 수 없습니다.');
    }

    event.isActive = false;
    return event.save();
  }
}