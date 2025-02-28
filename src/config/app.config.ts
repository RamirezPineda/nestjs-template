import { type ConfigModuleOptions } from '@nestjs/config';
import { joiValidationSchema } from '@/config/joi-validation.config';

export const EnvConfig = () => ({
  APP_NAME: process.env.APP_NAME || 'NestJS',
  APP_PROD: process.env.APP_PROD || false,
  APP_VERSION: process.env.APP_VERSION || '0.0.1',
  PORT: process.env.PORT || 4000,

  APP_URL: process.env.APP_URL || 'http://localhost:4000',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',

  DB_CONNECTION: process.env.DB_CONNECTION || 'postgres',
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 5432,
  DB_DATABASE: process.env.DB_DATABASE || 'postgres',
  DB_USERNAME: process.env.DB_USERNAME || 'postgres',
  DB_PASSWORD: process.env.DB_PASSWORD || '',

  SALT_ROUNDS: process.env.HASH_SALT || 10,
  JWT_AUTH: process.env.JWT_AUTH || 'my-password',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '8h',
});

export const appConfig: ConfigModuleOptions = {
  load: [EnvConfig],
  validationSchema: joiValidationSchema,
  validationOptions: {
    allowUnknown: true,
    abortEarly: false,
  },
  isGlobal: true,
};
