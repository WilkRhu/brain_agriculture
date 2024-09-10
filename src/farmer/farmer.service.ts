import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { Farmer } from './entities/farmer.entity';

@Injectable()
export class FarmerService {
  constructor(
    @InjectRepository(Farmer)
    private farmerRepository: Repository<Farmer>,
  ) {}

  async createFarmer(createFarmerDto: CreateFarmerDto): Promise<Farmer> {
    const farmer = this.farmerRepository.create(createFarmerDto);
    return this.farmerRepository.save(farmer);
  }

  async findAllFarmers(): Promise<Farmer[]> {
    return this.farmerRepository.find();
  }

  async findFarmerById(id: string): Promise<Farmer> {
    const farmer = await this.farmerRepository.findOne({ where: { id: id } });
    if (!farmer) {
      throw new NotFoundException(`Produtor rural com ID ${id} não encontrado`);
    }
    return farmer;
  }

  async updateFarmer(
    id: string,
    updateFarmerDto: UpdateFarmerDto,
  ): Promise<Farmer> {
    await this.farmerRepository.update(id, updateFarmerDto);
    return this.findFarmerById(id);
  }

  async removeFarmer(id: string): Promise<void> {
    const result = await this.farmerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Produtor rural com ID ${id} não encontrado`);
    }
  }
}
