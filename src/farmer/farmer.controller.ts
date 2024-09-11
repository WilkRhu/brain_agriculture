import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { UpdateFarmerDto } from './dto/update-farmer.dto';
import { Farmer } from './entities/farmer.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('farmers')
@Controller('farmers')
@ApiBearerAuth()
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) {}

  @Post()
  createFarmer(@Body() createFarmerDto: CreateFarmerDto): Promise<Farmer> {
    return this.farmerService.createFarmer(createFarmerDto);
  }

  @Get('count')
  async getFarmersCountByMonth() {
    try {
      const result = await this.farmerService.countFarmersByMonth();
      return result;
    } catch (error) {
      throw new Error(`Failed to get farmers count by month: ${error.message}`);
    }
  }

  @Get('total-area')
  async getTotalArea(): Promise<number> {
    return this.farmerService.getTotalArea();
  }

  @Get('by-state')
  async getFarmsByState() {
    return this.farmerService.countFarmsByState();
  }

  @Get('by-crop')
  async getFarmsByCrop() {
    return this.farmerService.getFarmCountByCrop();
  }

  @Get('land-use')
  async getLandUseDistribution() {
    return this.farmerService.getLandUseDistribution();
  }

  @Get()
  findAllFarmers(): Promise<Farmer[]> {
    return this.farmerService.findAllFarmers();
  }

  @Get(':id')
  findFarmerById(@Param('id') id: string): Promise<Farmer> {
    return this.farmerService.findFarmerById(id);
  }

  @Put(':id')
  updateFarmer(
    @Param('id') id: string,
    @Body() updateFarmerDto: UpdateFarmerDto,
  ): Promise<Farmer> {
    return this.farmerService.updateFarmer(id, updateFarmerDto);
  }

  @Delete(':id')
  removeFarmer(@Param('id') id: string): Promise<void> {
    return this.farmerService.removeFarmer(id);
  }
}
