export const API_URLS = {
  SIGNUP: '/auth/signup',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  CART: '/cart',
  CART_BY_ID: (id: number) => `/cart/${id}`,
  WISH: '/wishlist',
  WISH_BY_ID: (id: number) => `/wishlist/${id}`,
  ORDER: '/reservations',
  ORDER_BY_ID: (id: number) => `/reservations/${id}`,
  CATEGORY: '/categories',
  CATEGORY_BY_ID: (id: number) => `/categories/${id}`,
  BANNER: '/page/banners',
  UPLOAD_IMAGE: (category: string) => `/image?category=${category}`,
  USER: {
    INFO: '/user/myInfo',
    TYPE: '/user/type',
  },
  PRODUCT: {
    SEARCH_BY_KEYWORD: (
      keyword: string,
      page = 1,
      sort = 'recent',
      people = 1,
      dateOption: string | null = '',
    ) =>
      `/products/search?keyword=${keyword}&page=${page}&sort=${sort}&people=${people}&dateOption=${dateOption}`,
    SEARCH_BY_CATEGORY: (
      category: string,
      page: number,
      sort = 'recent',
      people = 1,
      dateOption: string | null = '',
    ) =>
      `/products/categories/${category}?page=${page}&sort=${sort}&people=${people}&dateOption=${dateOption}`,
    PRODUCT_BY_ID: (id: number) => `/products/detail/${id}`,
    PRODUCT_BY_RELATED: (id: number) => `/products/related/${id}`,
    PRODUCT_BY_POPULAR: (id?: number | undefined) =>
      id ? `/page/popular/products?categoryId=${id}` : '/page/popular/products',
    PRODUCT_BY_RECOMMEND: '/page/popular/regions',
    PRODUCT_BY_GROUP: '/page/group/products',
  },
  BOARD: {
    BOARD: '/board',
    BOARD_BY_ID: (id: number) => `/board/${id}`,
    BOARD_AUTH: (id: number) => `/board/authority/${id}`,
    BOARD_BY_TYPE: (type: string, keyword: string | null = '', pageNumber: number) =>
      keyword === null
        ? `/board?type=${type}&pageNumber=${pageNumber}`
        : `/board?type=${type}&keyword=${keyword}&pageNumber=${pageNumber}`,
    REVIEW: '/board/myreviews',
  },
  ADMIN: {
    PRODUCT: '/admin/products',
    PRODUCT_BY_ID: (id: number) => `/admin/products/${id}`,
    PRODUCT_PAGE: (page = 1) => `/admin/products?page=${page}`,
    PRODUCT_DETAIL: (id: number) => `/admin/products/detail/${id}`,
    CATEGORY: '/categories',
    CATEGORY_BY_ID: (id: number) => `/categories/${id}`,
    RECOMMEND: '/admin/regions',
    RECOMMEND_LIST: '/page/popular/regions',
    RECOMMEND_BY_ID: (id: number) => `/admin/regions/${id}`,
    BANNERLIST: '/admin/page/bannerlist',
    BANNER_BY_ID: (id: number) => `/admin/page/banner/${id}`,
    BANNER_ADD: '/admin/page/banner',
    BANNER_EDIT: (id: number) => `/admin/page/banner/${id}`,
  },
};
