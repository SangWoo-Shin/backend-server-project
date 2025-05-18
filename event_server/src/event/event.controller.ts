import { Controller, Patch, Req, Post, Get, Param, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './schemas/event.schema';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('Events')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({ summary: "이벤트 생성 - 관리자 또는 운영자만 가능"})
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @Post()
  async createEvent(
  @Body() createEventDto: CreateEventDto,
  ): Promise<Event> {
    return this.eventService.createEvent(createEventDto);
  }

  @ApiOperation({ summary: "모든 이벤트 조회 - 관리자, 운영자 또는 감사자만 가능"})
  @Roles(UserRole.ADMIN, UserRole.OPERATOR, UserRole.AUDITOR)
  @Get()
  async getAllEvents(): Promise<Event[]> {
    return this.eventService.getAllEvents();
  }

  @ApiOperation({ summary: "특정 이벤트 ID 조회 - 관리자, 운영자 또는 감사자만 가능"})
  @Roles(UserRole.ADMIN, UserRole.OPERATOR, UserRole.AUDITOR)
  @Get(':id')
  async getEventById( @Param('id') id: string ): Promise<Event | null> {
    return this.eventService.getEventById(id);
  }

  @ApiOperation({ summary: "이벤트 비활성화 - 관리자 또는 운영자만 가능" })
  @Roles(UserRole.ADMIN, UserRole.OPERATOR)
  @Patch(':id/deactivate')
  async deactivateEvent( @Param('id') id: string ): Promise<Event> {
    return this.eventService.deactivateEvent(id);
  }
}