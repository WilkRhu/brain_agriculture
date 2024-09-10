import { PlantedCropEnum } from 'src/enums/planted-crop.enum';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Farmer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 14 })
  cpfOrCnpj: string;

  @Column({ type: 'varchar', length: 100 })
  farmerName: string;

  @Column({ type: 'varchar', length: 100 })
  farmName: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 3 })
  state: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAreaHectares: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  arableAreaHectares: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  vegetationAreaHectares: number;

  @Column({ type: 'simple-array' })
  plantedCrops: PlantedCropEnum[];

  @ManyToOne(() => User, (user) => user.farmers)
  user: User;
}
