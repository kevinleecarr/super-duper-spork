import {Controller, Get, Delete, Param, Post, Body, Put} from '@nestjs/common';
import { AppService } from './app.service';
import {CustomerService} from "./database/mongo/customer.service";
import {Customer} from "./database/mongo/interfaces/customer.interface";
import { AccountService } from './externalService/account.service';

@Controller('/api/v1/customers')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly accountService: AccountService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.find(id);
  }

  @Get()
  async getCustomers() {
    return await this.customerService.findAll();
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: string) {
    return await this.customerService.delete(id);
  }

  @Post()
  async createCustomer(@Body() body: Customer) {
    return await this.customerService.create(body);
  }

  @Put(':id')
  async updateCustomer(@Body() body: Customer) {
    return await this.customerService.update(body);
  }
}
