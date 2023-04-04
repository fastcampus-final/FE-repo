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
  area: string;
  feature: string;
  airplane: string;
  singleRoomPrice: number;
  price: number;
  type: string;
  thumbnail: string;
  detail: string;
  productStatus: string;
  categories: ICategories[];
  productOptions: IProductOptions[];
}

interface ICategories {
  categoryName: string;
  categoryId: number;
}

interface IProductOptions {
  startDate: number[];
  endDate: number[];
  maxPeople: number;
  maxSingleRoom: number;
  presentSingleRoomNumber: number;
  productOptionId: number;
  presentPeopleNumber: number;
}
