import { Controller, Get, Post, Param, Body, Headers, ForbiddenException, UseGuards } from '@nestjs/common';
import { ProxyService } from '../proxy.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { firstValueFrom } from 'rxjs';

@Controller('/events')
export class EventProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createEvent(@Body() body: any, @Headers('Authorization') auth: string) {
    return  this.proxyService.post('/events', body, auth)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllEvents(@Headers('Authorization') auth: string) {
    return this.proxyService.get('/events', auth);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getEventById(@Param('id') id: string, @Headers('Authorization') auth: string) {
    return this.proxyService.get(`/events/${id}`, auth);
  }
}