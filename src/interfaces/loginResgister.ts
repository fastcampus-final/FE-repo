export interface IResProps {
  data: {
    code: number;
    data: string | null | ITokenProps;
    message: string;
    status: string;
  };
}

interface ITokenProps {
  accessToken: string;
  refreshToken: string;
}
