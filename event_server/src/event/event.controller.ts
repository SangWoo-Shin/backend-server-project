import { Controller,Headers, Post, Get, Param, Body, ForbiddenException} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './schemas/event.schema';
import { verifyUser } from '../utils/verifyUser';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  // 이벤트 생성 - 관리자 또는 운영자만 가능
  @Post()
  async createEvent(
  @Body() createEventDto: CreateEventDto,
  @Headers('Authorization') authHeader: string,
  ): Promise<Event> {
    const user = await verifyUser(authHeader);
    if (user.role !== 'ADMIN' && user.role !== 'OPERATOR') {
        throw new ForbiddenException('권한이 없습니다.');
    }
    return this.eventService.createEvent(createEventDto);
  }

  // 모든 이벤트 조회
  @Get()
  async getAllEvents(@Headers('Authorization') authHeader: string): Promise<Event[]> {
    const user = await verifyUser(authHeader);
    if (!['ADMIN', 'OPERATOR', 'AUDITOR'].includes(user.role)) {
      throw new ForbiddenException('권한이 없습니다.');
    }
    return this.eventService.getAllEvents();
  }

  // 특정 이벤트 ID 조회
  @Get(':id')
  async getEventById(
    @Param('id') id: string,
    @Headers('Authorization') authHeader: string,
  ): Promise<Event | null> {
    const user = await verifyUser(authHeader);
    if (!['ADMIN', 'OPERATOR', 'AUDITOR'].includes(user.role)) {
      throw new ForbiddenException('권한이 없습니다.');
    }
    return this.eventService.getEventById(id);
  }
}