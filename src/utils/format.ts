export const formatPrice = (value: number) => {
  return String(value)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    .concat(' 원');
};

export const formatPeriod = (value: string) => {
  return value.replace(/(\d{4})(\d{2})(\d{2})~(\d{4})(\d{2})(\d{2})/, '$1.$2.$3 ~ $4.$5.$6');
};

export const formatUserName = (value: string | undefined) => {
  if (value === '관리자') return value;
  else return value?.replace(/(?<=.{2})./gi, '*');
};

export const formatProductStatus = (value: string) => {
  switch (value) {
    case 'FOR_SALE':
      return '판매중';
    case 'STOP_SELLING':
      return '판매중지';
    case 'HIDING':
      return '숨김';
  }
};

export const formatProductType = (value: string) => {
  switch (value) {
    case 'A':
      return 'ESFJ / INFJ / INFP';
    case 'B':
      return 'ENTP / INTJ';
    case 'C':
      return 'ESTJ / ISTP';
    case 'D':
      return 'ESFP / ESTP / INTP / ISFP';
    case 'E':
      return 'ENFJ / ENTJ';
    case 'F':
      return 'ENFP / ISFJ / ISTJ';
    default:
      return '해당없음';
  }
};
