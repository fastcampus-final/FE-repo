export const orderColumns = [
  {
    accessor: 'userId' as const,
    Header: 'userId',
  },
  {
    accessor: 'userName' as const,
    Header: 'Name',
  },
  {
    accessor: 'reservationDate' as const,
    Header: '예약날짜',
  },
  {
    accessor: 'paymentMethod' as const,
    Header: '입금방법',
  },
  {
    accessor: 'totalAmount' as const,
    Header: '계산금액',
  },
  {
    accessor: 'productName' as const,
    Header: '상품명',
  },
  {
    accessor: 'reservationStatus' as const,
    Header: '결제상태',
  },
];
