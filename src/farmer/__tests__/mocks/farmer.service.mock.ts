import { PlantedCropEnum } from '@/enums/planted-crop.enum';
import { CreateFarmerDto } from '@/farmer/dto/create-farmer.dto';
import { UpdateFarmerDto } from '@/farmer/dto/update-farmer.dto';
import { Farmer } from '@/farmer/entities/farmer.entity';

export const mockFarmerService = {
  createFarmer: jest.fn(),
  findAllFarmers: jest.fn(),
  findFarmerById: jest.fn(),
  updateFarmer: jest.fn(),
  removeFarmer: jest.fn(),
};

export const mockRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

export const mockCreateFarmerDto: CreateFarmerDto = {
  cpfOrCnpj: '12345678901234',
  farmerName: 'John Doe',
  farmName: 'Doe Farms',
  city: 'Smalltown',
  state: 'ST',
  totalAreaHectares: 100.0,
  arableAreaHectares: 80.0,
  vegetationAreaHectares: 20.0,
  plantedCrops: [PlantedCropEnum.COFFEE, PlantedCropEnum.CORN],
  areaValidation: new CreateFarmerDto(),
};

export const mockUpdateFarmerDto: UpdateFarmerDto = {
  cpfOrCnpj: '98765432109876',
  farmerName: 'Jane Doe',
  farmName: 'Doe Farms Updated',
  city: 'Bigtown',
  state: 'BT',
  totalAreaHectares: 120.0,
  arableAreaHectares: 100.0,
  vegetationAreaHectares: 20.0,
  plantedCrops: [PlantedCropEnum.SOY, PlantedCropEnum.COFFEE],
};

export const mockFarmer: Farmer = {
  id: '1',
  ...mockCreateFarmerDto,
  createdAt: new Date(),
  updatedAt: new Date(),
};
