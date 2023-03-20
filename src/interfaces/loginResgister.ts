export interface ISignUpProps {
  data: {
    code: number;
    data: string | null;
    message: string;
    status: string;
  };
}

export interface ILoginProps {
  data: {
    code: number;
    data: null | ITokenProps;
    message: string;
    status: string;
  };
}

interface ITokenProps {
  accessToken: string;
  refreshToken: string;
}
