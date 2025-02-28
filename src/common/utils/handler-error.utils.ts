/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export const handlerError = (error: any, logger: Logger): any => {
  logger.error(error);
  if (error instanceof UnauthorizedException)
    throw new UnauthorizedException(error.message);
  if (error instanceof NotFoundException)
    throw new NotFoundException(error.message);
  if (error instanceof BadRequestException)
    throw new BadRequestException(error.message);
  if (error instanceof InternalServerErrorException)
    throw new InternalServerErrorException(error.message);
  if (error instanceof ConflictException)
    throw new ConflictException(error.message);
  if (error.type === 'Not Found') throw new NotFoundException(error.detail);
  if (error.code === '23503') throw new BadRequestException(error.detail);
  if (error.code === '23505') throw new BadRequestException(error.detail);
  if (error.code === '23502') throw new BadRequestException(error.detail);
  if (error.code === '22P02') throw new BadRequestException(error.detail);
  if (error.code === '23514') throw new BadRequestException(error.detail);
  if (error.code === '42601')
    throw new BadRequestException('Invalid attribute(attr) field');
  throw new InternalServerErrorException(
    'An unexpected mistake has happened, try again later',
  );
};
