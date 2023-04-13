import { alterModal } from '@/utils/check';
import { instance } from '../instance';

interface IProps {
  setUserData: React.Dispatch<React.SetStateAction<string>>;
  router: any;
  dispatch: any;
  id: string;
}

interface IPutProps {
  router: any;
  id: string;
  userData: string;
  dispatch: any;
}
interface IGetOneUserAdminData {
  router: any;
  setUserData: React.Dispatch<
    React.SetStateAction<{
      passportFirstName: string;
      passportLastName: string;
    }>
  >;
  dispatch: any;
}
interface IPutPassportFirst {
  router: any;
  userData: {
    passportFirstName: string;
    passportLastName: string;
  };
  setFirstDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: any;
}
interface IPutPassportLast {
  router: any;
  userData: {
    passportFirstName: string;
    passportLastName: string;
  };
  setlastDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: any;
}
interface IGetRadioUserAdmin {
  router: any;
  setUserData: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  dispatch: any;
}
interface IPutRadioUserAdmin {
  router: any;
  name: string;
  userData: string;
  dispatch: any;
}
interface IGetInputUserData {
  router: any;
  setUserData: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  dispatch: any;
}
interface IGetRoleUserData {
  router: any;
  dispatch: any;
  setUserData: React.Dispatch<React.SetStateAction<string>>;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
}
interface IPatchRoleAdmin {
  userEmail: string;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  dispatch: any;
}
interface IGetUserTable {
  page: number;
  setDatas: React.Dispatch<
    React.SetStateAction<{
      content: {
        userId: number;
        userEmail: string;
        userName: string;
        userRole: string;
      }[];
      pageNumber: number;
      totalPages: number;
    }>
  >;
  dispatch: any;
}

export const getUserAdminData = ({ router, setUserData, id, dispatch }: IProps) => {
  instance({
    method: 'GET',
    url: `https://www.go-together.store:443/admin/user/${router.query.id}`,
  })
    .then((res) => {
      setUserData(res.data[`${id}`]);
    })
    .catch(() => {
      alterModal('서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요', dispatch);
    });
};
export const putUserAdminData = async ({ router, id, userData, dispatch }: IPutProps) => {
  await instance({
    method: 'PUT',
    url: `https://www.go-together.store:443/admin/detail/${router.query.id}`,
    data: {
      [id]: userData,
    },
  })
    .then((res) => {
      return res;
    })
    .catch(() => {
      alterModal('서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요', dispatch);
    });
};
export const getOneUserAdminData = ({ router, setUserData, dispatch }: IGetOneUserAdminData) => {
  instance({
    method: 'GET',
    url: `https://www.go-together.store:443/admin/user/${router.query.id}`,
  })
    .then((res) => {
      setUserData({
        passportFirstName: res.data.passportFirstName,
        passportLastName: res.data.passportLastName,
      });
    })
    .catch(() => {
      alterModal('서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요', dispatch);
    });
};
export const putPassportFirst = async ({
  router,
  userData,
  setFirstDisabled,
  dispatch,
}: IPutPassportFirst) => {
  await instance({
    method: 'PUT',
    url: `https://www.go-together.store:443/admin/detail/${router.query.id}`,
    data: {
      passportFirstName: userData.passportFirstName,
    },
  })
    .then(() => {
      setFirstDisabled(true);
    })
    .catch(() => {
      alterModal('서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요', dispatch);
    });
};
export const putPassportLast = async ({
  router,
  userData,
  setlastDisabled,
  dispatch,
}: IPutPassportLast) => {
  await instance({
    method: 'PATCH',
    url: `https://www.go-together.store:443/admin/detail/${router.query.id}`,
    data: {
      passportLastName: userData.passportLastName,
    },
  })
    .then(() => {
      setlastDisabled(true);
    })
    .catch(() => {
      alterModal('서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요', dispatch);
    });
};
export const getRadioUserAdmin = ({ router, setUserData, name, dispatch }: IGetRadioUserAdmin) => {
  instance({
    method: 'GET',
    url: `https://www.go-together.store:443/admin/user/${router.query.id}`,
  })
    .then((res) => {
      setUserData(res.data[`${name}`]);
    })
    .catch(() => {
      alterModal('서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요', dispatch);
    });
};
export const putRadioUserAdmin = async ({
  router,
  name,
  userData,
  dispatch,
}: IPutRadioUserAdmin) => {
  await instance({
    method: 'PUT',
    url: `https://www.go-together.store:443/admin/detail/${router.query.id}`,
    data: {
      [name]: userData,
    },
  })
    .then((res) => {
      return res;
    })
    .catch(() => {
      alterModal('서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요', dispatch);
    });
};
export const getInputUserData = async ({
  router,
  setUserData,
  id,
  dispatch,
}: IGetInputUserData) => {
  instance({
    method: 'GET',
    url: `https://www.go-together.store:443/admin/user/${router.query.id}`,
  })
    .then((res) => {
      setUserData(res.data[`${id}`]);
    })
    .catch(() => {
      alterModal('서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요', dispatch);
    });
};
export const getRoleUserData = async ({
  router,
  setUserData,
  setUserEmail,
  dispatch,
}: IGetRoleUserData) => {
  instance({
    method: 'GET',
    url: `https://www.go-together.store:443/admin/user/${router.query.id}`,
  })
    .then((res) => {
      setUserData(res.data.role);
      setUserEmail(res.data.email);
    })
    .catch(() => {
      alterModal('서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요', dispatch);
    });
};
export const patchRoleAdmin = async ({ userEmail, setDisabled, dispatch }: IPatchRoleAdmin) => {
  instance({
    method: 'PATCH',
    url: `https://www.go-together.store:443/admin/setAdmin/${userEmail}`,
  })
    .then(async () => {
      await setDisabled(true);
    })
    .catch(() => {
      alterModal('서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요', dispatch);
    });
};
export const patchRoleUser = async ({ userEmail, setDisabled, dispatch }: IPatchRoleAdmin) => {
  instance({
    method: 'PATCH',
    url: `https://www.go-together.store:443/admin/deprivation/${userEmail}`,
  })
    .then(async () => {
      await setDisabled(true);
    })
    .catch(() => {
      alterModal('서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요', dispatch);
    });
};
export const getUserTable = async ({ page, setDatas, dispatch }: IGetUserTable) => {
  instance({
    method: 'GET',
    url: `https://www.go-together.store:443/admin/userList?page=${page}`,
  })
    .then((res) => {
      setDatas(res.data);
    })
    .catch(() => {
      alterModal('서버장해로 인해 데이터를 불러올 수 없습니다\n다시 시도해주세요', dispatch);
    });
};
