import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APICreateResult } from 'src/dto/api/api-create-result.dto';
import { InsertResult, Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { FindAllQueryDto } from './dto/find-all.query.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customersRepository: Repository<Customer>,
  ) {}

  // async getCustomersOfUserById(userId: number): Promise<Customer[]> {
  //   return await this.customersRepository.find({ userId });
  // }

  async findAll(findAllQueryDto: FindAllQueryDto): Promise<Customer[]> {
    return await this.customersRepository.find(findAllQueryDto);
  }

  async findOne(id: number): Promise<Customer> {
    return await this.customersRepository.findOne(id);
  }

  async create(
    userId: number,
    createCustomerDto: CreateCustomerDto,
  ): Promise<APICreateResult> {
    let res: InsertResult = await this.customersRepository.insert({
      ...createCustomerDto,
      userId,
    });
    return res.identifiers[0] as APICreateResult;
  }
}
