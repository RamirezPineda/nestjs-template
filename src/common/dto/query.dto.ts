import { Type } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsPositive,
  Min,
  IsEnum,
  IsString,
} from 'class-validator';
import {
  AttrType,
  AttrTypeEnum,
  Order,
  OrderEnum,
} from '@/common/interfaces/query.interface';

export class QueryDto {
  @IsOptional()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  offset?: number;

  @IsOptional()
  @IsEnum(OrderEnum)
  order?: Order;

  @IsOptional()
  @IsString()
  attr?: string;

  @IsOptional()
  value?: string;

  @IsOptional()
  @IsEnum(AttrTypeEnum)
  attrType?: AttrType;
}
