import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FarmerModule } from './farmer/farmer.module';
import { EnvConfigModule } from './infrastructure/env-config/env-config.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    EnvConfigModule,
    UserModule,
    AuthModule,
    FarmerModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
