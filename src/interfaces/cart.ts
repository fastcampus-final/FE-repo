export interface ICart {
  cartId: number;
  productId: number;
  productName: string;
  productPrice: number;
  productThumbnail: string;
  numberOfPeople: number;
  singleRoomNumber: number;
  singleRoomPrice: number;
  option: ICartOption;
  productOptions: ICartOption[];
}

export interface ICartOption {
  productOptionId: number;
  startDate: string;
  endDate: string;
}

export interface ICartEditOption {
  numberOfPeople: number;
  productOptionId: number;
  singleRoomNumber: number;
}

export interface ICartAdd {
  numberOfPeople: number;
  productId: number;
  productOptionId: number;
  singleRoomNumber: number;
}
