import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { RefreshTokenIdsStorage } from './authentication/refresh-token-ids.storage/refresh-token-ids.storage';
import { getConfigToken } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;

  const mockJwtConfiguration = {
    secret: 'mockSecret',
    audience: 'mockAudience',
    issuer: 'mockIssuer',
    accessTokenTtl: 3600,
    refreshTokenTtl: 86400,
  };

  const mockUsersService = {
    findOneByPhone: jest.fn().mockResolvedValue({ id: 'user1', role: 'user' }),
    findValidOtp: jest.fn().mockResolvedValue({ id: 'otp1' }),
    create: jest.fn().mockResolvedValue({ id: 'user1', role: 'user' }),
    createOTP: jest.fn().mockResolvedValue({ id: 'otp1' }),
  };

  const mockJwtService = {
    signAsync: jest.fn().mockResolvedValue('testToken'),
    verifyAsync: jest
      .fn()
      .mockResolvedValue({ sub: 'user1', refreshTokenId: 'refreshToken1' }),
  };

  const mockRefreshTokenIdsStorage = {
    insert: jest.fn().mockResolvedValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: getConfigToken('jwt'), useValue: mockJwtConfiguration },
        { provide: JwtService, useValue: mockJwtService },
        {
          provide: RefreshTokenIdsStorage,
          useValue: mockRefreshTokenIdsStorage,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate a user', async () => {
    const result = await service.validateUser('1234567890', 1234);
    expect(mockUsersService.findOneByPhone).toHaveBeenCalledWith('1234567890');
    expect(mockUsersService.findValidOtp).toHaveBeenCalledWith(
      { id: 'user1', role: 'user' },
      1234,
    );
    expect(result).toEqual({
      accessToken: 'testToken',
      refreshToken: 'testToken',
    });
  });

  it('should throw an UnauthorizedException if the user is not found', async () => {
    mockUsersService.findOneByPhone.mockResolvedValue(null);
    await expect(service.validateUser('1234567890', 1234)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
