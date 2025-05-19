import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RewardRequest, RewardRequestDocument } from './schemas/reward-request.shema';
import { RewardStatus } from './types/reward-status.enum';
import { Event } from '../event/schemas/event.schema';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class RewardRequestService {
  constructor(
    @InjectModel(RewardRequest.name)
    private readonly rewardRequestModel: Model<RewardRequestDocument>,
    @InjectModel(Event.name) private readonly eventModel: Model<Event>,
    private readonly httpService: HttpService,
  ) {}

  // 보상 요청 생성
   async createRequest(eventId: string, rewardId: string, userId: string): Promise<RewardRequest> {

    const now = new Date();
    const event = await this.eventModel.findById(eventId);

    if (!event || !event.isActive) {
      throw new NotFoundException('유효하지 않은 이벤트입니다.');
    }

    if (now < event.startDate || now > event.endDate) {
      throw new BadRequestException('이벤트 기간이 아닙니다.');
    }

    const existing = await this.rewardRequestModel.findOne({ user: userId, eventId, rewardId });
    if (existing) {
      throw new ConflictException('이미 요청한 보상입니다.');
    }

    const request = new this.rewardRequestModel({
      eventId,
      rewardId,
      user: userId,
      status: RewardStatus.PENDING,
    });

    return request.save();
  }

  // 유저별 요청 내역 조회
  async getUserRequests(userId: string): Promise<RewardRequest[]> {
    return this.rewardRequestModel.find({ user: userId })
      .populate('eventId')
      .populate('rewardId')
      .exec();
  }

  // 전체 요청 조회 (관리자용)
 async getAllRequests(eventId?: string, status?: string, token?: string): Promise<any[]> {
  const filter: any = {};
  if (eventId) filter.eventId = new Types.ObjectId(eventId);
  if (status) filter.status = status;

  const requests = await this.rewardRequestModel
    .find(filter)
    .populate('eventId')
    .populate('rewardId')
    .exec();

  const results = await Promise.all(
    requests.map(async (req) => {
      let userInfo = {};
      try {
        const baseUrl = process.env.AUTH_SERVER_URL || 'http://localhost:3001';
        const userId = typeof req.user === 'string' ? req.user : req.user.toString();
        const res = await lastValueFrom(
          this.httpService.get(`${baseUrl}/users/id/${userId}`, {
            headers: { Authorization: token },
          })
        );
        userInfo = res.data;
      } catch (e) {
        userInfo = { error: '유저 정보를 불러올 수 없음' };
      }

      return {
        ...req.toObject(),
        user: userInfo,
      };
    })
  );
    return results;
  } 

  // 요청 상태 변경 (승인/거절)
  async updateStatus(id: string, status: RewardStatus): Promise<RewardRequest | null> {
    if (!Object.values(RewardStatus).includes(status)) {
        throw new BadRequestException('잘못된 상태입니다.');
    }
    
    const request = await this.rewardRequestModel.findById(id);
    if (!request) {
        throw new NotFoundException('보상 요청이 존재하지 않습니다.');
    }

    if (request.status !== RewardStatus.PENDING) {
        throw new BadRequestException('이미 처리된 요청입니다.');
    }

    request.status = status;
    return request.save()
  }
}