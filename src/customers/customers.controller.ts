import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { APICreateResult } from 'src/dto/api/api-create-result.dto';
import { JwtAccessGuard } from 'src/jwt-access/jwt-access.guard';
import { User } from 'src/users/entities/user.entity';
import { UserDec } from 'src/users/user.decorator';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { FindAllQueryDto } from './dto/find-all.query.dto';

@UseGuards(JwtAccessGuard)
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  // @Get(':userId')
  // async getCustomersOfUserById(
  //   @Param('userId') userId: number,
  // ): Promise<Customer[]> {
  //   return await this.customersService.getCustomersOfUserById(userId);
  // }

  @Get('')
  async findAll(@Query() findAllQueryDto: FindAllQueryDto) {
    return this.customersService.findAll(findAllQueryDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.customersService.findOne(id);
  }

  @Post('')
  async create(
    @Body() createCustomerDto: CreateCustomerDto,
    @UserDec() user: User,
  ): Promise<APICreateResult> {
    return await this.customersService.create(user.id, createCustomerDto);
  }
}
