import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfModule } from './pdf/pdf.module';
import { PdfController } from './pdf/pdf.controller';
import { PdfService } from './pdf/pdf.service';
import { DatabaseModule } from './../config/database.module';
import { PdfRepository } from './pdf/pdf.repository';

@Module({
  imports: [
    PdfModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url:
        process.env.DATABASE_URL ||
        'postgres://myuser:mypassword@localhost:5432/mydatabase',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([PdfRepository]),
  ],
  controllers: [PdfController],
  providers: [PdfService],
})
export class AppModule {}
