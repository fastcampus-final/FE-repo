export interface IAllProps {
  data: {
    code: number;
    data: IInfoProps;
    status: string;
  };
}

interface IInfoProps {
  birth: string;
  email: string;
  name: string;
  phone: string;
}

export interface IPatchMyInfoProps {
  birth: string;
  email: string;
  name: string;
  password: string;
  phone: string;
}
