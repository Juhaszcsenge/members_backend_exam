import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { DataSource } from 'typeorm';
import { Members } from './entities/member.entity copy';
import { Payments } from './entities/payments.entity';

@Injectable()
export class MembersService {
  constructor(private dataSource: DataSource) {}
  async pay(id: number) {
    const memberRepo = this.dataSource.getRepository(Members);
    const paymentRepo = this.dataSource.getRepository(Payments);
    let MemberExist = await memberRepo.findOne({ where: { id: id } });
    if (!MemberExist) {
      throw new NotFoundException('Ez az azonosítójú tag nem találhato');
    }
    const paymentsByMember = await paymentRepo.find({
      where: { member_id: { id: MemberExist.id } },
      relations: { member_id: true },
    });

    let paidThisMonth = false;
    let today = new Date();
    for (let i = 0; i < paymentsByMember.length; i++) {
      if (
        paymentsByMember[i].paid_at.getFullYear() == today.getFullYear() &&
        paymentsByMember[i].paid_at.getMonth() == today.getMonth()
      ) {
        paidThisMonth = true;
      }
    }
    if (paidThisMonth) {
      throw new ConflictException('Ebben a hónapban már fizetett');
    }
    let newPayment: Payments = {
      id: 0,
      member_id: MemberExist,
      amount: 5000,
      paid_at: today,
    };
    paymentRepo.save(newPayment);
  }
  async create(createMemberDto: CreateMemberDto) {
    await this.dataSource.getRepository(Members).save(createMemberDto);
  }
  async findAll() {
    return {
      data: await this.dataSource.getRepository(Members).find({
        select: {
          id: true,
          name: true,
          gender: true,
          birth_date: true,
          created_at: true,
        },
      }),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
