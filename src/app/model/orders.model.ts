import { Timestamp } from 'rxjs';
import { Deserializable } from './deserializible.model';
import { Product } from './products.model';

export class Orders implements Deserializable {
  orderId: number;
  salesPersonName: string;
  orderSentDate: string;
  orderSentVia: string;
  fobPoint: string;
  terms: string;
  dueDate: string;
  companyName: string;
  phoneNumber: string;
  address: string;
  address2: string;
  gstin: string;
  tradeDiscount: string;
  tradeDiscountValue: number;
  cashDiscount: string;
  cashDiscountValue: number;
  csgstFlag: string;
  igstFlag: string;
  product: Product[];

  deserialize(input: any): this {
    Object.assign(this, input);
    this.product = input.product.map((prod: any) =>
      new Product().deserialize(prod)
    );
    return this;
  }
}
