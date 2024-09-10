import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from 'src/user/entities/user.entity';
import { Farmer } from 'src/farmer/entities/farmer.entity';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => {
  if (configService.get<string>('NODE_ENV') === 'test') {
    return {
      type: 'sqlite',
      database: ':memory:',
      entities: [User, Farmer],
      synchronize: true,
      dropSchema: true,
    };
  } else {
    return {
      type: 'postgres',
      host: configService.get<string>('DATABASE_HOST', 'localhost'),
      port: parseInt(configService.get<string>('DATABASE_PORT', '5432'), 10),
      username: configService.get<string>('DATABASE_USERNAME', 'root'),
      password: configService.get<string>('DATABASE_PASSWORD', '123'),
      database: configService.get<string>('DATABASE_NAME', 'brain_agriculture'),
      entities: [User, Farmer],
      synchronize: true,
      logging: configService.get<string>('DB_LOGGING', 'false') === 'false',
    };
  }
};
