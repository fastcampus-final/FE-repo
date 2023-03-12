export const API_URLS = {
  SIGNUP: '/signup',
  LOGIN: '/login',
  LOGOUT: '/logout',
  LIKE: '/cart',
  ORDER: '/order',
  DETAIL: (id: string) => `/product/${id}`,
  BUY: (id: string) => `/buy/${id}`,
  BUY_LIST: (page: number) => `/buy/${page}`,
  LIKE_LIST: (page: number) => `/like/${page}`,
  SEARCH: (data: any) => `/search/results?keyword=${data.keyword}&page=${data.page}`,
};
