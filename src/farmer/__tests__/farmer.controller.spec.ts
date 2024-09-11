/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { FarmerController } from '../farmer.controller';
import { FarmerService } from '../farmer.service';
import {
  mockCreateFarmerDto,
  mockFarmersCount,
  mockFarmerService,
  mockFarmsByCrop,
  mockFarmsByState,
  mockLandUseDistribution,
  mockTotalArea,
  mockUpdateFarmerDto,
} from './mocks/farmer.service.mock';
import { mockFarmer } from './mocks/farmer.mock';

describe('FarmerController', () => {
  let farmerController: FarmerController;
  let farmerService: FarmerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmerController],
      providers: [
        {
          provide: FarmerService,
          useValue: mockFarmerService,
        },
      ],
    }).compile();

    farmerController = module.get<FarmerController>(FarmerController);
    farmerService = module.get<FarmerService>(FarmerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(farmerController).toBeDefined();
  });

  describe('createFarmer', () => {
    it('should create a new farmer', async () => {
      mockFarmerService.createFarmer.mockResolvedValue(mockFarmer);

      const result = await farmerController.createFarmer(mockCreateFarmerDto);
      expect(mockFarmerService.createFarmer).toHaveBeenCalledWith(
        mockCreateFarmerDto,
      );
      expect(result).toEqual(mockFarmer);
    });
  });

  describe('findAllFarmers', () => {
    it('should return an array of farmers', async () => {
      mockFarmerService.findAllFarmers.mockResolvedValue([mockFarmer]);

      const result = await farmerController.findAllFarmers();
      expect(mockFarmerService.findAllFarmers).toHaveBeenCalled();
      expect(result).toEqual([mockFarmer]);
    });
  });

  describe('findFarmerById', () => {
    it('should return a farmer by ID', async () => {
      mockFarmerService.findFarmerById.mockResolvedValue(mockFarmer);

      const result = await farmerController.findFarmerById('1');
      expect(mockFarmerService.findFarmerById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockFarmer);
    });
  });

  describe('updateFarmer', () => {
    it('should update a farmer by ID', async () => {
      mockFarmerService.updateFarmer.mockResolvedValue({
        ...mockFarmer,
        ...mockUpdateFarmerDto,
      });

      const result = await farmerController.updateFarmer(
        '1',
        mockUpdateFarmerDto,
      );
      expect(mockFarmerService.updateFarmer).toHaveBeenCalledWith(
        '1',
        mockUpdateFarmerDto,
      );
      expect(result).toEqual({
        ...mockFarmer,
        ...mockUpdateFarmerDto,
      });
    });
  });

  describe('removeFarmer', () => {
    it('should remove a farmer by ID', async () => {
      mockFarmerService.removeFarmer.mockResolvedValue(undefined);

      const result = await farmerController.removeFarmer('1');
      expect(mockFarmerService.removeFarmer).toHaveBeenCalledWith('1');
      expect(result).toBeUndefined();
    });
  });

  describe('getFarmersCountByMonth', () => {
    it('should return farmers count by month', async () => {
      mockFarmerService.countFarmersByMonth.mockResolvedValue(mockFarmersCount);

      const result = await farmerController.getFarmersCountByMonth();

      expect(result).toEqual(mockFarmersCount);
      expect(farmerService.countFarmersByMonth).toHaveBeenCalled();
    });

    it('should throw an error if countFarmersByMonth fails', async () => {
      mockFarmerService.countFarmersByMonth.mockRejectedValue(
        new Error('Failed to get farmers count'),
      );

      await expect(farmerController.getFarmersCountByMonth()).rejects.toThrow(
        'Failed to get farmers count by month: Failed to get farmers count',
      );
    });
  });

  describe('getTotalArea', () => {
    it('should return the total area of all farmers', async () => {
      mockFarmerService.getTotalArea.mockResolvedValue(mockTotalArea);

      const result = await farmerController.getTotalArea();

      expect(result).toBe(mockTotalArea);
      expect(farmerService.getTotalArea).toHaveBeenCalled();
    });
  });

  describe('getFarmsByState', () => {
    it('should return farms count by state', async () => {
      mockFarmerService.countFarmsByState.mockResolvedValue(mockFarmsByState);

      const result = await farmerController.getFarmsByState();

      expect(result).toEqual(mockFarmsByState);
      expect(farmerService.countFarmsByState).toHaveBeenCalled();
    });
  });

  describe('getFarmsByCrop', () => {
    it('should return farms count by crop', async () => {
      mockFarmerService.getFarmCountByCrop.mockResolvedValue(mockFarmsByCrop);

      const result = await farmerController.getFarmsByCrop();

      expect(result).toEqual(mockFarmsByCrop);
      expect(farmerService.getFarmCountByCrop).toHaveBeenCalled();
    });
  });

  describe('getLandUseDistribution', () => {
    it('should return land use distribution', async () => {
      mockFarmerService.getLandUseDistribution.mockResolvedValue(
        mockLandUseDistribution,
      );

      const result = await farmerController.getLandUseDistribution();

      expect(result).toEqual(mockLandUseDistribution);
      expect(farmerService.getLandUseDistribution).toHaveBeenCalled();
    });
  });
});
