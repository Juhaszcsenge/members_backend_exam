import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Members } from './member.entity copy';

@Entity()
export class Payments {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Members, (member) => member.id)
  member_id: number;
  @Column()
  amount: number;
  @Column()
  paid_at: Date;
}
