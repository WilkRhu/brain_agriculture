/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '@/user/user.service';
import { User } from '@/user/entities/user.entity';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UpdateUserDto } from '@/user/dto/update-user.dto';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockUser: User = {
    id: '1',
    username: 'Test User',
    email: 'test@example.com',
    password: 'hashedpassword',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'New User',
        email: 'newuser@example.com',
        password: 'password123',
        createdAt: undefined,
        updatedAt: undefined,
      };

      mockUserRepository.create.mockReturnValue(mockUser);
      mockUserRepository.save.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);
      expect(mockUserRepository.create).toHaveBeenCalledWith(createUserDto);
      expect(mockUserRepository.save).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      mockUserRepository.find.mockResolvedValue([mockUser]);

      const result = await service.findAll();
      expect(mockUserRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findUserId', () => {
    it('should return a user by ID', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findUserId('1');
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('findOneByEmail', () => {
    it('should return a user by email', async () => {
      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findOneByEmail('test@example.com');
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      const updateUserDto: UpdateUserDto = {
        username: 'Updated Name',
      };

      mockUserRepository.update.mockResolvedValue(null);
      mockUserRepository.findOneBy.mockResolvedValue({
        ...mockUser,
        ...updateUserDto,
      });

      const result = await service.update('1', updateUserDto);
      expect(mockUserRepository.update).toHaveBeenCalledWith(
        '1',
        updateUserDto,
      );
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual({ ...mockUser, ...updateUserDto });
    });
  });

  describe('remove', () => {
    it('should remove a user by ID', async () => {
      mockUserRepository.delete.mockResolvedValue(null);

      await service.remove('1');
      expect(mockUserRepository.delete).toHaveBeenCalledWith('1');
    });
  });
});
