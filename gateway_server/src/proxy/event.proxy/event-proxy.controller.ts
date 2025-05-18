import { Controller, Get, Post, Param, Body, Req, UseGuards, Patch } from '@nestjs/common';
import { ProxyService } from '../proxy.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateEventDto } from 'src/dto/create-event.dto';

@ApiTags('Events')
@ApiBearerAuth()
@Controller('/events')
@UseGuards(JwtAuthGuard)
export class EventProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @ApiOperation({ summary: "이벤트 생성 - 관리자 또는 운영자만 가능"})
  @Post()
  createEvent(@Body() body: CreateEventDto, @Req() req: Request) {
    const token = req.headers['authorization'];
    return this.proxyService.post('/events', body, token);
  }

  @ApiOperation({ summary: "모든 이벤트 조회 - 관리자, 운영자 또는 감사자만 가능"})
  @Get()
  getAllEvents(@Req() req: Request) {
    const token = req.headers['authorization'];
    return this.proxyService.get('/events', token);
  }

  @ApiOperation({ summary: "특정 이벤트, ID로 조회 - 관리자, 운영자 또는 감사자만 가능"})
  @Get(':id')
  getEventById(@Param('id') id: string, @Req() req: Request) {
    const token = req.headers['authorization'];
    return this.proxyService.get(`/events/${id}`, token);
  }

  @ApiOperation({ summary: "이벤트 비활성화 - 관리자 또는 운영자만 가능" })
  @Patch(':id/deactivate')
  deactivateEvent(@Param('id') id: string, @Req() req: Request) {
    const token = req.headers['authorization'];
    return this.proxyService.patch(`/events/${id}/deactivate`, {}, token);
  }
}