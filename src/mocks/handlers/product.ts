import { rest } from 'msw';

const PRODUCT = {
  content: [
    {
      productId: '1',
      title: '일본 여행 패키지 (5박 6일)',
      price: '2000000',
    },
    {
      productId: '2',
      title: '유렵 여행 패키지 (10박 11일)',
      price: '5500000',
    },
    {
      productId: '3',
      title: '호주 여행 패키지 (18박 19일)',
      price: '7000000',
    },
    {
      productId: '4',
      title: '동남아시아 여행 패키지 (10박 11일)',
      price: '4500000',
    },
    {
      productId: '5',
      title: '일본 여행 패키지 (5박 6일)',
      price: '2000000',
    },
    {
      productId: '6',
      title: '유렵 여행 패키지 (10박 11일)',
      price: '5500000',
    },
    {
      productId: '7',
      title: '호주 여행 패키지 (18박 19일)',
      price: '7000000',
    },
    {
      productId: '8',
      title: '동남아시아 여행 패키지 (10박 11일)',
      price: '4500000',
    },
  ],
};

const LikeHandlers = [
  rest.get(`${process.env.NEXT_PUBLIC_API_MOCKING_URL}/product`, (req, res, ctx) => {
    return res(
      ctx.json({
        message: '상품 목록 조회 성공',
        code: 200,
        data: {
          ...PRODUCT,
        },
      }),
    );
  }),
];

export default LikeHandlers;
