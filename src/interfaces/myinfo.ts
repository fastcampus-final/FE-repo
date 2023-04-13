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
  passportFirstName: string;
  passportLastName: string;
  userGender: string;
  userBirth: string;
  userEmail: string;
  userName: string;
  userType: string;
  userPhoneNumber: string;
}
