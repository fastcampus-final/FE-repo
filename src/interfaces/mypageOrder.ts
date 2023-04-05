export interface IOrder {
  reservationId: number;
  paymentMethod: string;
  reservationDate: string;
  reservationDetailId: number;
  productId: number;
  productThumbnail: string;
  reservationStatus: string;
  startDate: string;
  endDate: string;
  reservationPeopleNumber: number;
  reservationSingleRoomNumber: number;
  productSingleRoomPrice: number;
  productPrice: number;
  detailTotalPrice: number;
}

export interface IOrderDetail {
  userId: number;
  userEmail: string;
  userName: string;
  reservationId: number;
  reservationDate: string;
  paymentMethod: string;
  reservationDetailId: number;
  productId: number;
  productName: string;
  productThumbnail: string;
  reservationStatus: string;
  startDate: string;
  endDate: string;
  reservationPeopleNumber: number;
  reservationSingleRoomNumber: number;
  productSingleRoomPrice: number;
  productPrice: number;
  detailTotalPrice: number;
}
