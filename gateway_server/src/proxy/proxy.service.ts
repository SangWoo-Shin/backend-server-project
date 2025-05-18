import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

//Gateway Server에서 API 요청을 하위 서비스(Auth, Event 등)로 전달하는 역할을 수행합니다.
@Injectable()
export class ProxyService {
  constructor(private readonly httpService: HttpService) {}

  // 요청 경로에 따라 요청을 보낼 대상 서비스의 Base URL 결정
  private getTargetBaseUrl(path: string): string {
    if (path.startsWith('/auth') || path.startsWith('/users')) {
      return 'http://localhost:3001';
    } else {
      return 'http://localhost:3000';
    }
  }

  // Authorization 토큰이 있으면 헤더에 포함시킴
  private buildHeaders(token?: string): Record<string, string> {
    const headers: Record<string, string> = {};
    if (token) {
      headers['Authorization'] = token;
    }
    return headers;
  }

  // 공통 HTTP 요청 처리 함수
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

  //GET 요청 프록시
  async get(path: string, token?: string) {
    return this.forwardRequest('GET', path, token);
  }

  //POST 요청 프록시
  async post(path: string, body: any, token?: string) {
    return this.forwardRequest('POST', path, token, body);
  }

  //PATCH 요청 프록시
  async patch(path: string, body: any, token?: string) {
    return this.forwardRequest('PATCH', path, token, body);
  }


  //DELETE 요청 프록시
  async delete(path: string, token?: string) {
    return this.forwardRequest('DELETE', path, token);
  }
}