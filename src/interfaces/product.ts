export interface IProduct {
  productId: string;
  productName: string;
  productPrice: string;
  productThumbnail: string;
}

export interface IProductDetail {
  productId: string;
  productName: string;
  productPrice: string;
  productThumbnail: string;
  // summary: string;
  // area: string;
  // point: string;
  // airline: string;
}

export interface IDetail {
  productId: string;
  title: string;
  price: string;
  imagePath: string;
  summary: string;
  area: string;
  point: string;
  airline: string;
}
