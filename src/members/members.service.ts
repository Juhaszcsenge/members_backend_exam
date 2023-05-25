import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { DataSource } from 'typeorm';
import { Members } from './entities/member.entity copy';

@Injectable()
export class MembersService {
  constructor(private dataSource: DataSource) {}
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
