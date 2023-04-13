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

export const formatMbtiToText = (value: string) => {
  switch (value) {
    case 'ESFJ':
      return '누구에게라도 먼저 다가가 기꺼이 손을 뻗는 마당발 타입';
    case 'INFJ':
      return '차분하게 주변 사람들을 복돋아주는 다정한 타입';
    case 'INFP':
      return '늘 함께하는 이들을 위해 최선을 다하는 헌신가 타입';
    case 'ENTP':
      return '새로운 도전거리에 거리낌이 없고 뭐든 창조해내는 타입';
    case 'INTJ':
      return '계획적이면서도 새로운 것에 대해 열린 마음의 소유자 타입';
    case 'ESTJ':
      return '맡겨진 것이 무엇이든 최고의 성과를 도출하는 데 탁월한 타입';
    case 'ISTP':
      return '어떤 상황에서도 뚝딱뚝딱 해결책을 내어놓는 팔방미인 타입';
    case 'ESFP':
      return '순발력있는 재치와 열정으로 유쾌함을 전하는 에너지 소유자 타입';
    case 'ESTP':
      return '면밀하게 관찰하고 영리하게 리스크를 즐기는 도전정신을 가진 타입';
    case 'INTP':
      return '계획적으로 다가올 상황에 대처할 방법을 찾는 전략가 타입';
    case 'ISFP':
      return '호기심이 많고 유연하며 매력넘치는 예술가 타입';
    case 'ENFJ':
      return '그룹 내에서 진취적으로 도전하며 이끄는 카리스마를 가진 타입';
    case 'ENTJ':
      return '상상력 넘치는 비젼으로 공동체를 이끄는 지도자 타입';
    case 'ENFP':
      return '처음 보는 사람과도 쉽게 친해지는 긍정주의자 타입';
    case 'ISFJ':
      return '성실하고 책임감 있게 행동하는 온화한 성격의 소유자 타입';
    case 'ISTJ':
      return '주어진 조건 내에서 믿음직한 모습을 보여주는 성실한 타입';
    default:
      return '';
  }
};
