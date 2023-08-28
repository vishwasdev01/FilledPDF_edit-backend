import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
export default (): TypeOrmModuleOptions => ({
  type: 'postgres',
  url: 'postgres://myuser:mypassword@localhost:5432/mydatabase', // Replace with your actual values

  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'nestjs_pdf_example',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true, // Only for development
});
