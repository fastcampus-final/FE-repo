import { alterModal } from '@/utils/check';
import { instance } from './instance';

interface IProps {
  method: string;
  data: {
    productId: number;
    productOptionId: number;
    reservationPeopleNumber: number;
    reservationSingleRoomNumber: number;
  }[];
  router: any;
  items: {
    cartId: number;
    numberOfPeople: number;
    option: {
      endDate: string;
      productOptionId: number;
      startDate: string;
    };
    productId: number;
    productName: string;
    productOptions: {
      endDate: string;
      productOptionId: number;
      startDate: string;
    }[];
    productPrice: number;
    productThumbnail: string;
    singleRoomNumber: number;
    singleRoomPrice: number;
  }[];
  dispatch: any;
}

export const postOrder = async ({ method, data, router, items, dispatch }: IProps) => {
  await instance({
    method: 'POST',
    url: 'https://www.go-together.store:443/reservations',
    data: {
      paymentMethod: method,
      reservationList: data,
    },
  })
    .then(() => {
      router.push({
        pathname: '/order/success',
        query: { items: JSON.stringify(items) },
      });
    })
    .catch(() => {
      alterModal('서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요', dispatch);
    });
};
