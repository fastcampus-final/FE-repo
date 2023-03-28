import { IPatchMyInfoProps } from '@/interfaces/myinfo';

export const globalAge = (myinfo: IPatchMyInfoProps) => {
  const today = new Date();
  const birthDate = new Date(myinfo.birth);

  let old = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    return (old -= 1);
  }
  return old;
};
