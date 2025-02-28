import * as Joi from 'joi';

export const joiValidationSchema = Joi.object({
  APP_NAME: Joi.string().default('NestJS'),
  APP_PROD: Joi.boolean().default(false),
  APP_VERSION: Joi.string().default('0.0.1'),
  PORT: Joi.number().default(4000),

  APP_URL: Joi.string().default('http://localhost:4000'),
  FRONTEND_URL: Joi.string().default('http://localhost:5173'),

  DB_CONNECTION: Joi.string().default('postgres'),
  DB_HOST: Joi.string().default('localhost'),
  DB_PORT: Joi.number().default(5432),
  DB_DATABASE: Joi.string().default('postgres'),
  DB_USERNAME: Joi.string().default('postgres'),
  DB_PASSWORD: Joi.string().default(''),

  SALT_ROUNDS: Joi.number().default(10),
  JWT_AUTH: Joi.string().default('my-password'),
  JWT_EXPIRATION: Joi.string().default('8h'),
});
