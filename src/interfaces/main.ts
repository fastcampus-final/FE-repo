export interface IBanner {
  bannerId: number;
  image: string;
  productId: number;
}

export interface IRegions {
  image: string;
  regionName: string;
  rate: number;
  regionId: number;
}

export interface IPopolarProduct {
  categories: ICategories[];
  productId: number;
  productName: string;
  productSummary: string;
  productArea: string;
  productThumbnail: string;
  productPrice: number;
  productStatus: string;
}

export interface ICategories {
  categoryName: string;
  categoryId: number;
}
