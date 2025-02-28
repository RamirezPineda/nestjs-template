import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { appConfig } from '@/config/app.config';
import { dataSourceConfig } from '@/config/data-source.config';
import { CommonModule } from '@/common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(appConfig),
    TypeOrmModule.forRoot(dataSourceConfig),
    CommonModule,
  ],
})
export class AppModule {}
