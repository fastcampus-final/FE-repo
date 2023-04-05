export interface IOrder {
  reservationNumber: number;
  paymentMethod: string;
  totalAmount: number;
  reservationStatus: string;
  reservationDate: string;
  reservationProductList: IOrderDetail;
}

interface IOrderDetail {
  reservationDetailId: number;
  productId: string;
  reservationTravelDate: string;
  reservationNumber: number;
  reservationSingleNumber: number;
  productSingleRoomPrice: number;
  productPrice: number;
  productTotalPrice: number;
}
