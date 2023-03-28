export interface ISignUpProps {
  data: {
    code: number;
    data: string | null;
    message: string;
    status: string;
  };
}

export interface ILoginProps {
  data: ITokenProps;
  message: string;
  status: number;
}

interface ITokenProps {
  accessToken: string;
  refreshToken: string;
  role: string;
}
