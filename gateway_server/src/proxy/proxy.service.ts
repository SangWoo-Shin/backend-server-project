import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProxyService {
  constructor(private readonly httpService: HttpService) {}

  private getTargetBaseUrl(path: string): string {
    if (path.startsWith('/auth')) {
      return 'http://localhost:3001';
    } else {
      return 'http://localhost:3000';
    }
  }

  private buildHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = token;
    }
    return headers;
  }

  async forwardRequest(
    method: string,
    path: string,
    token?: string,
    body?: any,
  ) {
    const baseUrl = this.getTargetBaseUrl(path);

    const config = {
      method,
      url: `${baseUrl}${path}`,
      headers: this.buildHeaders(token),
      data: body,
    };

    try {
      const response = await firstValueFrom(this.httpService.request(config));
      return response.data;
    } catch (error) {
      if (error.response) {
        return {
          status: error.response.status,
          message: error.response.data?.message || 'Downstream service error',
        };
      }
      throw error;
    }
  }

  async get(path: string, token?: string) {
    return this.forwardRequest('GET', path, token);
  }

  async post(path: string, body: any, token?: string) {
    return this.forwardRequest('POST', path, token, body);
  }

  async patch(path: string, body: any, token?: string) {
    return this.forwardRequest('PATCH', path, token, body);
  }

  async delete(path: string, token?: string) {
    return this.forwardRequest('DELETE', path, token);
  }
}