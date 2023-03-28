export const formatPrice = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',').concat('원');
};

export const formatPeriod = (value: string) => {
  return value.replace(/(\d{4})(\d{2})(\d{2})~(\d{4})(\d{2})(\d{2})/, '$1.$2.$3 ~ $4.$5.$6');
};
