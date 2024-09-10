import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import {
  mockJwtService,
  mockUserService,
  mockUtils,
} from './mocks/auth.service.mock';

describe('AuthService', () => {
  let service: AuthService;
  const userService = mockUserService;
  const jwtService = mockJwtService;
  const utils = mockUtils;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return null if user not found', async () => {
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(null);

      const result = await service.validateUser(
        'nonexistent@example.com',
        'password',
      );
      expect(result).toBeNull();
    });

    it('should return null if password is incorrect', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'hashedPassword',
      };
      jest.spyOn(userService, 'findOneByEmail').mockResolvedValue(user);
      jest.spyOn(utils, 'comparePasswords').mockResolvedValue(false);

      const result = await service.validateUser(user.email, 'wrongPassword');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return a token', async () => {
      const user = { id: '1', email: 'test@example.com' };
      const token = 'jwtToken';
      jest.spyOn(jwtService, 'sign').mockReturnValue(token);

      const result = await service.login(user);
      expect(jwtService.sign).toHaveBeenCalledWith({
        id: user.id,
        email: user.email,
      });
      expect(result).toEqual({ access_token: token });
    });

    it('should throw an HttpException on error', async () => {
      const user = { id: '1', email: 'test@example.com' };
      jest.spyOn(jwtService, 'sign').mockImplementation(() => {
        throw new Error('Error signing token');
      });

      await expect(service.login(user)).rejects.toThrow(HttpException);
    });
  });

  describe('create', () => {
    it('should throw an HttpException on error', async () => {
      const user = { id: '1', email: 'test@example.com', password: 'password' };
      jest
        .spyOn(utils, 'hashPassword')
        .mockRejectedValue(new Error('Error hashing password'));

      await expect(service.create(user)).rejects.toThrow(HttpException);
    });
  });

  describe('generateToken', () => {
    it('should generate a JWT token', async () => {
      const user = {
        uuid: '1',
        name: 'Test User',
        email: 'test@example.com',
        role: 'admin',
        status: 'active',
      };
      const token = 'jwtToken';
      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(token);

      const result = await service['generateToken'](user);
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        uuid: user.uuid,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
      expect(result).toEqual(token);
    });
  });
});
