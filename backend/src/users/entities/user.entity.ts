import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { compare } from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User {
  @ApiProperty({ type: String, format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;


  @Column({ unique: true })
  phone_number: string;

  @Column()
  password: string

  @Column({ default: false })
  is_admin: boolean

  @ApiProperty({ type: Date })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  async validatePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }
}
