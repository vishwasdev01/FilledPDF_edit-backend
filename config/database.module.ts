// config/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm'; // Import TypeOrmModuleOptions
import databaseConfig from '../config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig as () => TypeOrmModuleOptions, // Use TypeOrmModuleOptions
    }),
  ],
})
export class DatabaseModule {}
