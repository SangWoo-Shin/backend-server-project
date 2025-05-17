import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private readonly eventModel: Model<EventDocument>,
  ) {}

  async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = new this.eventModel(createEventDto);
    return newEvent.save();
  }

  async getAllEvents(): Promise<Event[]> {
    return this.eventModel.find();
  }

  async getEventById(id: string): Promise<Event | null> {
    return this.eventModel.findById(id);
  }
}