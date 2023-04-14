import { IPatchMyInfoProps } from '@/interfaces/myinfo';

export const globalAge = (myinfo: IPatchMyInfoProps) => {
  const today = new Date();

  const birthDate = new Date(
    Number(myinfo.userBirth.slice(0, 4)),
    Number(myinfo.userBirth.slice(4, 6)),
    Number(myinfo.userBirth.slice(6, 8)),
  );

  let old = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    return (old -= 1);
  }
  return old;
};
