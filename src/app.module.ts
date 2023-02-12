import { Module } from '@nestjs/common';
import { CustomerController} from './customerController';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import {OrgController} from "./orgController";

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController, OrgController],
  providers: [AppService],
})
export class AppModule {}
