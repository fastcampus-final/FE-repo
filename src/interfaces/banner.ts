export interface IBanner {
  bannerId: number;
  image: string;
  productId: number;
  tag: string;
  title: string;
  subtitle: string;
}

export interface IBannerForm extends IBanner {
  image: string;
  productId: number;
  subtitle: string;
  tag: string;
  title: string;
}
