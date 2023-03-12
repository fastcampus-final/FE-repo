export const ROUTES = {
  HOME: '/',
  SIGNUP: '/signup',
  LOGIN: '/login',
  SEARCH: '/search',
  CART: '/cart',
  BUY: '/buy',
  MYPAGE: '/mypage',
  MYPAGE_LIKE: '/mypage/like',
  MYPAGE_BUY: '/mypage/buy',
  MYPAGE_INFO: '/mypage/info',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  PRODUCT_BY_ID: (id: string) => `/products/${id}`,
};
