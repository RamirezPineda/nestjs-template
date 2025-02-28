import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { type TypeOrmModuleOptions } from '@nestjs/typeorm';

void ConfigModule.forRoot({ envFilePath: '.env' });
const configService = new ConfigService();

export const dataSourceConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [__dirname + '/../**/entities/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  // synchronize: configService.get('APP_PROD') === 'true' ? true : false,
  synchronize: true,
  autoLoadEntities: true,
  logging: false,
  extra: {
    timezone: 'America/La_Paz',
  },
  namingStrategy: new SnakeNamingStrategy(),
};
