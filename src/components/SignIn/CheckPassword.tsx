import React, { useEffect, useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import styled from '@emotion/styled';

const CheckPassword = ({ password }: any) => {
  const [res, setRes] = useState('');
  const [cnt, setCnt] = useState(0);

  const passwordCondition = ['[A-Z]', '[a-z]', '[0-9]', '[!@#$%^&*()]'];

  useEffect(() => {
    for (let i = 0; i < passwordCondition.length; i += 1) {
      if (new RegExp(passwordCondition[i]).test(password)) {
        setCnt(cnt + 1);
      }
    }
  }, []);

  useEffect(() => {
    if (cnt === 2) {
      setRes('낮음');
    } else if (cnt === 3) {
      setRes('적정');
    } else if (cnt === 4) {
      setRes('높음');
    }
  }, []);

  return (
    <div>
      {cnt !== 0 && res !== '' && (
        <div>
          <CheckCircleOutlineIcon fontSize="small" />
          비밀번호 안전도 : {res}
        </div>
      )}
    </div>
  );
};

export default CheckPassword;

const Safety = styled.div`
  display: flex;
  align-items: center;
`;
