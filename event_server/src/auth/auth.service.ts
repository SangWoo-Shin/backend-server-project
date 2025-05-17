import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ExternalAuthService {
  constructor(private readonly httpService: HttpService) {}

  async getUserById(userId: string): Promise<any> {
    const url = `http://localhost:3001/users/${userId}`;
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}