import { setModal } from '@/store/modal';

export const checkPassword = (password: string) => {
  let res = '';
  let cnt = 0;
  const passwordCondition = ['[A-Z]', '[a-z]', '[0-9]', '[!@#$%^&*()]'];

  for (let i = 0; i < passwordCondition.length; i += 1) {
    if (new RegExp(passwordCondition[i]).test(password)) {
      cnt += 1;
    }
  }

  switch (cnt) {
    case 2:
      res = '낮음';
      break;
    case 3:
      res = '적정';
      break;
    case 4:
      res = '높음';
      break;
    default:
      return '';
  }
  return `비밀번호 안전도 : ${res}`;
};

export const alterModal = async (message: string, dispatch: any) => {
  await dispatch(
    setModal({
      isOpen: true,
      onClickOk: () => dispatch(setModal({ isOpen: false })),
      text: message,
    }),
  );
};
