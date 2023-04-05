export interface IProduct {
  productId: string;
  productName: string;
  productPrice: number;
  productThumbnail: string;
}

export interface IProductDetail {
  productId: string;
  name: string;
  summary: string;
  price: number;
  area?: string;
  feature?: string;
  airplane?: string;
  singleRoomPrice?: number;
  type?: string;
  thumbnail: any;
  detail: string;
  productStatus?: string;
  categories?: ICategory[];
  productOptions?: IProductOption[];
  // startDate: string;
  // endDate: string;
  // maxPeople: number;
  // presentSingleRoomNumber: number;
  // maxSingleRoom: number;
  // presentPeopleNumber: number;
  // productOptionId: number;
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
  categoryId: number;
  categoryName: string;
  categoryDepth?: number;
  children?: ICategory[];
}

export interface IProductOption {
  startDate: string;
  endDate: string;
  maxPeople: number;
  maxSingleRoom: number;
  presentSingleRoomNumber: number;
  productOptionId: number;
  presentPeopleNumber: number;
}

export interface IRecommend {
  regionId: number;
  regionName: string;
  rate: number;
  image: string;
}
