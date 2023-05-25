import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Payments } from './payments.entity';

@Entity()
export class Members {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ type: 'enum', enum: ['M', 'F'], nullable: true })
  gender: string;
  @Column({ type: 'date' })
  birth_date: Date;
  @Column()
  banned: boolean;
  @OneToMany(() => Payments, (payment) => payment.member_id)
  payments: Payments[];
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
  @CreateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
