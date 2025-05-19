import { Test, TestingModule } from '@nestjs/testing';
import { RewardRequestService } from './reward-request.service';
import { getModelToken } from '@nestjs/mongoose';
import { RewardRequest } from './schemas/reward-request.shema';
import { Event } from '../event/schemas/event.schema';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, ConflictException } from '@nestjs/common';

describe('RewardRequestService', () => {
  let service: RewardRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RewardRequestService,
        {
          provide: getModelToken(RewardRequest.name),
          useValue: {
            findOne: jest.fn().mockResolvedValue(null),
            save: jest.fn(),
          },
        },
        {
          provide: getModelToken(Event.name),
          useValue: {
            findById: jest.fn().mockResolvedValue({
              isActive: true,
              startDate: new Date('2025-05-01'),
              endDate: new Date('2025-06-01'),
            }),
          },
        },
        {
          provide: HttpService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<RewardRequestService>(RewardRequestService);
  });

  it('기한 만료되면 BadRequestException 에러를 나타낼 것', async () => {
    const now = new Date('2025-07-01');
    jest.spyOn(global, 'Date').mockImplementation(() => now as any);

    await expect(
      service.createRequest('eventId', 'rewardId', 'userId'),
    ).rejects.toThrow(BadRequestException);
  });

  it('이미 중복 요청된 건은 ConflictException 에러를 나타낼 것', async () => {
    jest.spyOn(service['rewardRequestModel'], 'findOne').mockResolvedValueOnce({});

    await expect(
      service.createRequest('eventId', 'rewardId', 'userId'),
    ).rejects.toThrow(ConflictException);
  });
});