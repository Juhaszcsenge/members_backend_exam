import { Injectable } from '@nestjs/common';
import { Payments } from './members/entities/payments.entity';
import { faker } from '@faker-js/faker';
import { DataSource } from 'typeorm';
import { Members } from './members/entities/member.entity';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}
  getHello(): string {
    return 'Hello World!';
  }
  async randomdata() {
    for (let i = 0; i < 15; i++) {
      let data = await this.generateData();
      await this.dataSource.getRepository(Payments).save(data);
    }
  }
  async generateData() {
    let membersList = await this.dataSource.getRepository(Members).find();
    let newPayment: Payments = {
      id: 0,
      member_id: faker.helpers.arrayElement(membersList),
      paid_at: faker.date.past(),
      amount: faker.number.int({ min: 10000, max: 200000 }),
    };
    return newPayment;
  }
}
