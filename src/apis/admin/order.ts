import { alterModal } from '@/utils/check';
import { instance } from '../instance';

interface IProps {
  setdatas: React.Dispatch<
    React.SetStateAction<{
      content: {
        paymentMethod: string;
        reservationDate: string;
        reservationId: number;
        reservationProductList: {
          productId: number;
          productName: string;
          reservationDetailId: number;
          reservationStatus: string;
        }[];
        totalAmount: string;
        userId: number;
        userName: string;
      }[];
      totalPages: number;
    }>
  >;
  page: number;
  dispatch: any;
}
interface IPatchOrderData {
  event: React.ChangeEvent<HTMLSelectElement>;
  item: any;
}

export const getOrderData = async ({ setdatas, page, dispatch }: IProps) => {
  instance({
    method: 'GET',
    url: `https://www.go-together.store:443/admin/reservations?page=${page}`,
  })
    .then((res) => {
      setdatas(res.data);
    })
    .catch(() =>
      alterModal('서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요', dispatch),
    );
};
export const patchOrderData = async ({ item, event }: IPatchOrderData) => {
  instance({
    method: 'PATCH',
    url: `https://www.go-together.store:443/admin/reservations/${item.reservationDetailId}`,
    data: {
      reservationStatus: event.target.value,
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => console.log(error));
};
