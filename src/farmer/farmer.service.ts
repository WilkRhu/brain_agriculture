import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { Farmer } from './entities/farmer.entity';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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

  async countFarmersByMonth(): Promise<{
    month: { [key: string]: number };
    total: number;
  }> {
    const startOfYear = new Date();
    startOfYear.setMonth(0);
    startOfYear.setDate(1);
    startOfYear.setHours(0, 0, 0, 0);

    const endOfYear = new Date();
    endOfYear.setMonth(11);
    endOfYear.setDate(31);
    endOfYear.setHours(23, 59, 59, 999);

    const results = await this.farmerRepository
      .createQueryBuilder('farmer')
      .select("DATE_TRUNC('month', farmer.createdAt)", 'month')
      .addSelect('COUNT(*)', 'count')
      .where('farmer.createdAt BETWEEN :startOfYear AND :endOfYear', {
        startOfYear,
        endOfYear,
      })
      .groupBy('month')
      .orderBy('month', 'ASC')
      .getRawMany();

    const monthlyCounts: { [key: string]: number } = {};
    let totalCount = 0;

    const monthNames = [
      'jan',
      'feb',
      'mar',
      'apr',
      'may',
      'jun',
      'jul',
      'aug',
      'sep',
      'oct',
      'nov',
      'dec',
    ];

    for (const result of results) {
      const monthIndex = new Date(result.month).getMonth();
      const month = monthNames[monthIndex];
      const count = parseInt(result.count, 10);
      monthlyCounts[month] = count;
      totalCount += count;
    }

    return {
      month: monthlyCounts,
      total: totalCount,
    };
  }

  async getTotalArea(): Promise<number> {
    const result = await this.farmerRepository
      .createQueryBuilder('farmer')
      .select('SUM(farmer.totalAreaHectares)', 'totalArea')
      .getRawOne();

    return parseFloat(result.totalArea) || 0;
  }

  async countFarmsByState(): Promise<{ state: string; count: number }[]> {
    return this.farmerRepository
      .createQueryBuilder('farmer')
      .select('farmer.state', 'state')
      .addSelect('COUNT(farmer.id)', 'count')
      .groupBy('farmer.state')
      .getRawMany();
  }

  async getFarmCountByCrop(): Promise<any> {
    const farms = await this.farmerRepository.find();
    const cropCount = {};

    farms.forEach((farm) => {
      farm.plantedCrops.forEach((crop) => {
        if (!cropCount[crop]) {
          cropCount[crop] = 0;
        }
        cropCount[crop] += 1;
      });
    });

    return cropCount;
  }

  async getLandUseDistribution(): Promise<any> {
    const farms = await this.farmerRepository.find();

    let totalArableArea = 0;
    let totalVegetationArea = 0;

    farms.forEach((farm) => {
      totalArableArea += Number(farm.arableAreaHectares);
      totalVegetationArea += Number(farm.vegetationAreaHectares);
    });

    return {
      arableArea: totalArableArea,
      vegetationArea: totalVegetationArea,
    };
  }
}
