import { ROUTES } from '@/constants/routes';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React from 'react';

import { isMobile } from 'react-device-detect';

const GroupTrip = () => {
  const router = useRouter();
  return (
    <GroupContent mobile={isMobile.toString()}>
      <div className="groupTop">
        <GroupWrap
          mobile={isMobile.toString()}
          image="https://gotogetherpictureupload.s3.ap-northeast-2.amazonaws.com/main/5070_1681036315752.png"
          onClick={() => router.push({ pathname: ROUTES.PRODUCT, query: { categoryId: 4 } })}
        >
          <p>actice SENIOR</p>
        </GroupWrap>
        <GroupWrap
          mobile={isMobile.toString()}
          image="https://gotogetherpictureupload.s3.ap-northeast-2.amazonaws.com/main/anyone_1681036696171.png"
          onClick={() => router.push({ pathname: ROUTES.PRODUCT, query: { categoryId: 8 } })}
        >
          <p>with ANYONE</p>
        </GroupWrap>
      </div>
      <div className="groupBottom">
        <GroupWrap
          mobile={isMobile.toString()}
          image="https://gotogetherpictureupload.s3.ap-northeast-2.amazonaws.com/main/men_1681036829691.png"
          onClick={() => router.push({ pathname: ROUTES.PRODUCT, query: { categoryId: 5 } })}
        >
          <p>MEN only</p>
        </GroupWrap>
        <GroupWrap
          mobile={isMobile.toString()}
          image="https://gotogetherpictureupload.s3.ap-northeast-2.amazonaws.com/main/women_1681037000284.png"
          onClick={() => router.push({ pathname: ROUTES.PRODUCT, query: { categoryId: 6 } })}
        >
          <p>WOMEN only</p>
        </GroupWrap>
        {isMobile ? null : (
          <GroupWrap
            mobile={isMobile.toString()}
            image="https://gotogetherpictureupload.s3.ap-northeast-2.amazonaws.com/main/family_1681036959719.png"
            onClick={() => router.push({ pathname: ROUTES.PRODUCT, query: { categoryId: 7 } })}
          >
            <p>with FAMILY</p>
          </GroupWrap>
        )}
      </div>
    </GroupContent>
  );
};

export default GroupTrip;

const GroupContent = styled.div<{ mobile: string }>`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: ${(props) => (props.mobile === 'true' ? '4rem' : '7rem')};
  position: relative;
  .groupTop {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    p {
      margin-top: ${(props) => (props.mobile === 'true' ? '80%' : '45%')};
    }
  }
  .groupBottom {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    p {
      margin-top: ${(props) => (props.mobile === 'true' ? '80%' : '65%')};
    }
  }
`;

const GroupWrap = styled.div<{ image: string; mobile: string }>`
  width: 50%;
  height: ${(props) => props.mobile !== 'true' && '300px'};
  text-align: center;
  background-image: url(${(props) => props.image});
  background-position: center center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  box-shadow: inset 0 -80px 100px rgba(51, 51, 51, 0.5);

  transition: all 0.7s ease-in-out;
  ${(props) =>
    props.mobile === 'true' &&
    css`
      aspect-ratio: 1/1;
      border-radius: 8px;
    `}
  &:hover {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15), 0 2px 2px rgba(0, 0, 0, 0.15),
      0 4px 4px rgba(0, 0, 0, 0.15), 0 8px 8px rgba(0, 0, 0, 0.15);
  }
  p {
    font-size: 1rem;

    color: #fff;
    font-weight: 600;
  }
  cursor: pointer;
`;
