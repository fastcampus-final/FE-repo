export const API_URLS = {
  EMAIL_DUPL_CHECK: '/auth/email/check',
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  SEARCH_BY_KEYWORD: (
    keyword: string,
    page = 1,
    sort = 'recent',
    people = 1,
    dateOption: string | null = '',
  ) =>
    `/products/search?keyword=${keyword}&page=${page}&sort=${sort}&people=${people}&dateOption=${dateOption}`,
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
  BOARD_SEARCH: (
    keyword: string,
    page: number,
    sort?: string,
    people?: number,
    dateOption?: string,
  ) =>
    `/board/search?keyword=${keyword}&page=${page}&sort=${sort}&people=${people}&dateOption=${dateOption}`,
  CATEGORY: '/categories',
  CATEGORY_DETAIL: (id: string) => `/categories/${id}`,
  ADMIN: {},
};
