import {Controller, Get, Delete, Param, Post, Body} from '@nestjs/common';
import { AppService } from './app.service';
import {CustomerService} from "./database/mongo/customer.service";
import {Customer} from "./database/mongo/interfaces/customer.interface";
import { v4 as uuidv4 } from 'uuid';

@Controller('/api/v1/orgs')
export class OrgController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async createOrg(@Body() body) {
    const customer:any = await this.customerService.find(body.customerId);
    customer.oktaOrgId = uuidv4();
    await this.customerService.update(customer);
    return {
      customerId: customer._id,
      oktaOrgId: customer.oktaOrgId,
    };
  }

  @Post(':id/link')
  async linkOrg(@Param('id') id: string, @Body() body) {
    const customer:any = await this.customerService.findByOrgId(id);
    customer.oktaLinkedProductId = uuidv4();
    await this.customerService.update(customer);
    return {
      id: customer.oktaLinkedProductId
    };
  }
}
