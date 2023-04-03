export const API_URLS = {
  EMAIL_DUPL_CHECK: '/auth/email/check',
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  SEARCH_BY_KEYWORD: (keyword: string, page: number) =>
    `/products/search?keyword=${keyword}&page=${page}`,
  SEARCH_BY_CATEGORY: (category: string, page: number) =>
    `/products/categories/${category}?page=${page}`,
  DETAIL: (id: string) => `/products/details/${id}`,
  BUY: (id: string) => `/buy/${id}`,
  BUY_LIST: (page: number) => `/buy/${page}`,
  CART: '/cart',
  ORDER: '/order',
  BOARD: '/board',
  BOARD_AUTH: (id: string) => `/board/authority/${id}`,
  BOARD_DETAIL: (id: string) => `/board/detail/${id}`,
  BOARD_SEARCH: (keyword: string, page: number) => `/board/search?keyword=${keyword}&page=${page}`,
  CATEGORY: '/categories',
  CATEGORY_DETAIL: (id: string) => `/categories/${id}`,
  ADMIN: {},
};
