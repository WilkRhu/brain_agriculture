/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { FarmerController } from '../farmer.controller';
import { FarmerService } from '../farmer.service';
import {
  mockCreateFarmerDto,
  mockFarmerService,
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
});
