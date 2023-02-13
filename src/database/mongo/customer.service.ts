import { Injectable, Inject } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Customer } from './interfaces/customer.interface';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('MongoDBConnection')
    private readonly connection: typeof mongoose,
  ) {}
  private productModel: mongoose.Model<Customer>;
  async onModuleInit() {
    this.productModel = this.connection.model<Customer>(
      '',
      new mongoose.Schema({
        name: String,
        subdomain: String,
        oktaSkus: { type: [String] },
        oktaLinkedProductId: String,
        oktaOrgId: String,
      }),
    );
  }
  async findAll(): Promise<Customer[]> {
    return await this.productModel.find().exec();
  }
  async create(product: Customer): Promise<Customer> {
    const createdProduct = new this.productModel(product);
    return await createdProduct.save();
  }
  async delete(id: string): Promise<Customer> {
    return this.productModel.findByIdAndRemove(id);
  }
  async find(id: string): Promise<Customer> {
    return this.productModel.findById(id);
  }

  async update(customer: any): Promise<Customer> {
    return this.productModel.findByIdAndUpdate(customer._id, customer);
  }

  async findByOrgId(oktaOrgId: string): Promise<Customer> {
    return this.productModel.findOne({ oktaOrgId: oktaOrgId });
  }
}
