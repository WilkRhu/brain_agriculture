import { PlantedCropEnum } from '@/enums/planted-crop.enum';
import { Farmer } from '@/farmer/entities/farmer.entity';

export const mockFarmer: Farmer = {
  id: '1',
  cpfOrCnpj: '12345678901234',
  farmerName: 'John Doe',
  farmName: 'Doe Farms',
  city: 'Smalltown',
  state: 'ST',
  totalAreaHectares: 100.0,
  arableAreaHectares: 80.0,
  vegetationAreaHectares: 20.0,
  plantedCrops: [PlantedCropEnum.COFFEE, PlantedCropEnum.CORN],
  createdAt: new Date(),
  updatedAt: new Date(),
};
