export enum OrderEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum AttrTypeEnum {
  number = 'number',
  string = 'string',
  date = 'date',
  boolean = 'boolean',
  enum = 'enum',
}

export type Order = 'ASC' | 'DESC';
export type AttrType = 'number' | 'string' | 'date' | 'boolean' | 'enum';

export interface Query {
  skip?: number;
  take?: number;
  order: { createdAt: Order };
  where: { [x: string]: boolean } | { [x: string]: string };
}
