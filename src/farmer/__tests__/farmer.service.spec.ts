import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import {
  mockCreateFarmerDto,
  mockFarmer,
  mockRepository,
  mockUpdateFarmerDto,
} from './mocks/farmer.service.mock';
import { FarmerService } from '../farmer.service';
import { Farmer } from '../entities/farmer.entity';

describe('FarmerService', () => {
  let service: FarmerService;
  const repository = mockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmerService,
        {
          provide: getRepositoryToken(Farmer),
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<FarmerService>(FarmerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createFarmer', () => {
    it('should create and save a farmer', async () => {
      repository.create.mockReturnValue(mockFarmer);
      repository.save.mockResolvedValue(mockFarmer);

      const result = await service.createFarmer(mockCreateFarmerDto);
      expect(repository.create).toHaveBeenCalledWith(mockCreateFarmerDto);
      expect(repository.save).toHaveBeenCalledWith(mockFarmer);
      expect(result).toEqual(mockFarmer);
    });
  });

  describe('findAllFarmers', () => {
    it('should return an array of farmers', async () => {
      const mockFarmers = [mockFarmer];
      repository.find.mockResolvedValue(mockFarmers);

      const result = await service.findAllFarmers();
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(mockFarmers);
    });
  });

  describe('findFarmerById', () => {
    it('should return a farmer by ID', async () => {
      repository.findOne.mockResolvedValue(mockFarmer);

      const result = await service.findFarmerById('1');
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toEqual(mockFarmer);
    });

    it('should throw a NotFoundException if the farmer is not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findFarmerById('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('updateFarmer', () => {
    it('should throw a NotFoundException if the farmer to update is not found', async () => {
      repository.update.mockResolvedValue({ affected: 0 });

      await expect(
        service.updateFarmer('1', mockUpdateFarmerDto),
      ).rejects.toThrow(NotFoundException);
    });
    it('should update and return a farmer', async () => {
      repository.update.mockResolvedValue({ affected: 1 });
      repository.findOne.mockResolvedValue(mockFarmer);

      const result = await service.updateFarmer('1', mockUpdateFarmerDto);
      expect(repository.update).toHaveBeenCalledWith('1', mockUpdateFarmerDto);
      expect(result).toEqual(mockFarmer);
    });
  });

  describe('removeFarmer', () => {
    it('should remove a farmer by ID', async () => {
      repository.delete.mockResolvedValue({ affected: 1 });

      await expect(service.removeFarmer('1')).resolves.toBeUndefined();
      expect(repository.delete).toHaveBeenCalledWith('1');
    });

    it('should throw a NotFoundException if the farmer to remove is not found', async () => {
      repository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.removeFarmer('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
