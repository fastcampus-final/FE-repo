import { rest } from 'msw';

const LIKE = {
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
  ],
};

const LikeHandlers = [
  rest.get(`${process.env.NEXT_PUBLIC_API_MOCKING_URL}/like`, (req, res, ctx) => {
    return res(
      ctx.json({
        message: '관심상품 목록 조회 성공',
        code: 200,
        data: {
          ...LIKE,
        },
      }),
    );
  }),
];

export default LikeHandlers;
