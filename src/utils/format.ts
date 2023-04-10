export const formatPrice = (value: number) => {
  return String(value)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    .concat(' 원');
};

export const formatPeriod = (startDate: string, endDate: string) => {
  return `${startDate} ~ ${endDate}`;
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

export const formatTypeToMbti = (value: string) => {
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

// export const formatMbtiToType = (value: string) => {
//   switch (value) {
//     case 'ESFJ':
//     case 'INFJ':
//     case 'INFP':
//       return 'A';
//     case 'ENTP':
//     case 'INTJ':
//       return 'B';
//     case 'ESTJ':
//     case 'ISTP':
//       return 'C';
//     case 'ESFP':
//     case 'ESTP':
//     case 'INTP':
//     case 'ISFP':
//       return 'D';
//     case 'ENFJ':
//     case 'ENTJ':
//       return 'E';
//     case 'ENFP':
//     case 'ISFJ':
//     case 'ISTJ':
//       return 'F';
//     default:
//       return '';
//   }
// };
