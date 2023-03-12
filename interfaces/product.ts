import { BaseResponse } from './base';

export interface IProduct extends BaseResponse {
  productId: string;
  title: string;
  price: string;
}
