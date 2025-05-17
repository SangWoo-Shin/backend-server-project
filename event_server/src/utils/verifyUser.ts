import axios from 'axios';
import { ForbiddenException } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

export async function verifyUser(token: string) {
  try {
    const res = await axios.get(`${process.env.AUTH_SERVER_URL}/auth/verify`, {
      headers: { Authorization: token, },
    });
    return res.data;
  } catch (e) {
    console.error('❌ Axios 오류:', e.response?.data || e.message);
    throw new ForbiddenException('유효하지 않은 토큰입니다.');
  }
}