import { Controller, Get, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomerService } from './database/mongo/customer.service';
import { OrgService } from './externalService/okta.service';
import { AccountService } from './externalService/account.service';

const oktaBaseUrl = 'https://hardtank-parent.clouditude.com';
const accountId = '025wkdcrd8qbowb9ard5pfjfnma';
const accountServiceBaseUrl = 'https://accountservice.clouditude.com/' + accountId;

const sswsToken = '000hwbLgnq-JHUiH4ZLS2aXufUsUh1cW-W9OsjTHhr';

@Controller('/api/v1/account')
export class AccountController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly appService: AppService,
    private readonly orgService: OrgService,
    private readonly accountService: AccountService,
  ) {}

  @Get('entitledSkus')
  async getEntitledSkus() {
    const accessToken = await this.appService.getOktaAccessToken();

    return await this.accountService.getEntitledSkus(
      accountServiceBaseUrl,
      accessToken,
    );
  }
}
