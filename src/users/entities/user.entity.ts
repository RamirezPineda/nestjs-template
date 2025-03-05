import { BaseEntity } from '@/common/entities/base.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({
    name: 'email',
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
    select: false,
    nullable: false,
  })
  password: string;

  @Column({
    name: 'status',
    type: 'boolean',
    default: true,
    nullable: false,
  })
  status: boolean;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
