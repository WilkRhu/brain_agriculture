import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FarmerModule } from './farmer/farmer.module';
import { EnvConfigModule } from './infrastructure/env-config/env-config.module';
import { DatabaseModule } from './infrastructure/database/database.module';

@Module({
  imports: [EnvConfigModule, UserModule, FarmerModule, DatabaseModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
