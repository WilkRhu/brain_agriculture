import { Farmer } from 'src/farmer/entities/farmer.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true, length: 100 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => Farmer, (farmer) => farmer.user)
  farmers: Farmer[];
}
