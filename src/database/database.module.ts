import { Module } from '@nestjs/common';
import { CustomerService } from './mongo/customer.service';
import {databaseProviders} from "./mongo/mongo.provider/mongo.provider";

@Module({
  providers: [...databaseProviders, CustomerService],
  exports: [CustomerService],
})
export class DatabaseModule {}