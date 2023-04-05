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
  BOARD: (type: string, pageNumber: number) => `/board?type=${type}&pageNumber=${pageNumber}`,
  BOARD_AUTH: (id: string) => `/board/authority/${id}`,
  BOARD_DETAIL: (id: number) => `/board/detail/${id}`,
  BOARD_SEARCH: (type: string, keyword: string, pageNumber: number) =>
    `/board/search?type=${type}&keyword=${keyword}&pageNumber=${pageNumber}`,
  BOARD_ADD: '/board',
  BOARD_EDIT: (boardId: number) => `/board/${boardId}`,
  CATEGORY: '/categories',
  CATEGORY_DETAIL: (id: string) => `/categories/${id}`,
  UPLOAD_IMAGE: (category: string) => `/image?category=${category}`,
  MYPAGE: {
    RESERVATIONS: '/reservations',
    RESERVATIONS_BY_ID: (id: number) => `/reservations/${id}`,
    REVIEW: '/board/myreviews',
  },
  ADMIN: {
    PRODUCT: '/admin/products',
    PRODUCT_DETAIL: (id: string) => `/admin/products/detail/${id}`,
    CATEGORY: '/categories',
    CATEGORY_BY_ID: (id: string) => `/categories/${id}`,
    RECOMMEND: '/page/popular/regions',
    RECOMMEND_BY_ID: (id: string) => `/admin/regions/${id}`,
  },
};
