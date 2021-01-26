import { Deserializable } from './deserializible.model';


export class Product implements Deserializable {
    productId: string;
    productDesc: string;
    hsnCode: string;
    quantity: number;
    unitPrice: number;

    deserialize(input: any): this {
        return Object.assign(this, input);
      }
}