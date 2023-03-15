export const formatPrice = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',').concat('원');
};
