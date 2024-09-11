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

  describe('countFarmersByMonth', () => {
    it('should return farmers count per month and total count', async () => {
      const mockQueryResult = [
        { month: '2024-01-01T00:00:00.000Z', count: '5' },
        { month: '2024-02-01T00:00:00.000Z', count: '3' },
      ];

      repository.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(mockQueryResult),
        getRawOne: undefined,
      });

      const result = await service.countFarmersByMonth();

      expect(result).toEqual({
        month: { dec: 5, jan: 3 },
        total: 8,
      });
    });
  });

  describe('getTotalArea', () => {
    it('should return total area of farmers', async () => {
      const mockQueryResult = { totalArea: '1234.56' };

      repository.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue(mockQueryResult),
        addSelect: undefined,
        where: undefined,
        groupBy: undefined,
        orderBy: undefined,
        getRawMany: undefined,
      });

      const result = await service.getTotalArea();
      expect(result).toEqual(1234.56);
    });

    it('should return 0 if total area is not found', async () => {
      const mockQueryResult = { totalArea: null };

      repository.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        getRawOne: jest.fn().mockResolvedValue(mockQueryResult),
        addSelect: undefined,
        where: undefined,
        groupBy: undefined,
        orderBy: undefined,
        getRawMany: undefined,
      });

      const result = await service.getTotalArea();
      expect(result).toEqual(0);
    });
  });

  describe('countFarmsByState', () => {
    it('should return count of farms by state', async () => {
      const mockQueryResult = [
        { state: 'CA', count: '10' },
        { state: 'TX', count: '20' },
      ];

      repository.createQueryBuilder.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        groupBy: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValue(mockQueryResult),
        where: undefined,
        orderBy: undefined,
        getRawOne: undefined,
      });

      const result = await service.countFarmsByState();
      expect(result).toEqual(mockQueryResult);
    });
  });

  describe('getFarmCountByCrop', () => {
    it('should return farm count by planted crops', async () => {
      const mockFarms = [
        { plantedCrops: ['corn', 'wheat'] },
        { plantedCrops: ['wheat'] },
        { plantedCrops: ['corn'] },
      ];

      repository.find.mockResolvedValue(mockFarms);

      const result = await service.getFarmCountByCrop();
      expect(result).toEqual({ corn: 2, wheat: 2 });
    });
  });

  describe('getLandUseDistribution', () => {
    it('should return total arable and vegetation area', async () => {
      const mockFarms = [
        { arableAreaHectares: 100, vegetationAreaHectares: 50 },
        { arableAreaHectares: 200, vegetationAreaHectares: 150 },
      ];

      repository.find.mockResolvedValue(mockFarms);

      const result = await service.getLandUseDistribution();
      expect(result).toEqual({
        arableArea: 300,
        vegetationArea: 200,
      });
    });
  });
});
