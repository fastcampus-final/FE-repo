export interface IProduct {
  productId: number;
  productName: string;
  productPrice: number;
  productThumbnail: string;
  productStatus?: string;
}

export interface IProductDetail {
  productId: number;
  name: string;
  summary: string;
  price: number;
  area?: string;
  feature?: string;
  airplane?: string;
  singleRoomPrice?: number;
  type?: string | null;
  thumbnail: any;
  detail: string;
  productStatus?: string;
  categories?: ICategory[];
  productOptions?: IProductOption[];
}

export interface IProductDetailForm extends IProductDetail {
  startDate: string;
  endDate: string;
  maxPeople: number;
  presentSingleRoomNumber: number;
  maxSingleRoom: number;
  presentPeopleNumber: number;
  productOptionId: number;
}

export interface ICategory {
  categoryId?: number;
  categoryName: string;
  categoryDepth: number;
  children?: ICategory[];
  categoryParent?: number;
}

export interface IProductOption {
  productOptionId?: number;
  startDate: string;
  endDate: string;
  maxPeople: number;
  maxSingleRoom: number;
  presentPeopleNumber?: number;
  presentSingleRoomNumber?: number;
}

export interface IRecommend {
  regionId?: number;
  regionName: string;
  rate: number;
  image: any;
}

export interface IReservation {
  productId: number | undefined;
  productOptionId: number;
  reservationPeopleNumber: number;
  reservationSingleRoomNumber: number;
}
