import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomerService } from './database/mongo/customer.service';
import { OrgService } from './externalService/okta.service';
import { AccountService } from './externalService/account.service';

const oktaBaseUrl = 'https://hardtank-parent.clouditude.com';
const accountId = '025wkdcrd8qbowb9ard5pfjfnma';
const accountServiceBaseUrl =
  'https://accountservice.clouditude.com/' + accountId;

const sswsToken = '000hwbLgnq-JHUiH4ZLS2aXufUsUh1cW-W9OsjTHhr';

@Controller('/api/v1/orgs')
export class OrgController {
  constructor(
    private readonly customerService: CustomerService,
    private readonly appService: AppService,
    private readonly orgService: OrgService,
    private readonly accountService: AccountService,
  ) {}

  @Post()
  async createOrg(@Body() body) {
    const customer: any = await this.customerService.find(body.customerId);
    const org = await this.orgService.createOrg(
      oktaBaseUrl,
      sswsToken,
      customer.name,
      customer.subdomain,
    );
    customer.oktaOrgId = org.id;
    await this.customerService.update(customer);
    return {
      customerId: customer._id,
      oktaOrgId: customer.oktaOrgId,
    };
  }

  @Post(':id/link')
  async linkOrg(@Param('id') orgId: string) {
    const customer: any = await this.customerService.findByOrgId(orgId);
    const accessToken = await this.appService.getOktaAccessToken();
    const linkedProduct: any = await this.accountService.linkOrg(
      accountServiceBaseUrl,
      accessToken,
      customer.oktaOrgId,
    );
    customer.oktaLinkedProductId = linkedProduct.id;
    await this.customerService.update(customer);
    return {
      id: customer.oktaLinkedProductId,
    };
  }

  @Put(':id/skus')
  async updateSkus(@Param('id') orgId: string, @Body() skus: any) {
    const customer: any = await this.customerService.findByOrgId(orgId);
    const accessToken = await this.appService.getOktaAccessToken();

    const skuMap = {
      '024dxe2lpej8bpvpw0szeko-klc': 'P000020',
      '024dxe2lpej8bpvpw0szekm-klc': 'P000052',
      '024dxe2lpej8bpvpw0szekn-klc': 'P000131',
    };

    skus = skus.map((sku) => {
      return {
        id: skuMap[sku] ? skuMap[sku] : sku.id,
      };
    });

    await this.accountService.updateSkus(
      accountServiceBaseUrl,
      accessToken,
      customer.oktaLinkedProductId,
      skus,
    );

    await this.customerService.update(customer);
    return {
      id: customer.oktaLinkedProductId,
    };
  }
}
