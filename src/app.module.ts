import { Module } from '@nestjs/common';
import { CustomerController } from './customerController';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { OrgController } from './orgController';
import { OrgService } from './externalService/okta.service';
import { AccountService } from './externalService/account.service';
import { AccountController } from './accountController';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController, OrgController, AccountController],
  providers: [AppService, OrgService, AccountService],
})
export class AppModule {}
