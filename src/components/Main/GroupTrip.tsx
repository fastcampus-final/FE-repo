import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';

import { isMobile } from 'react-device-detect';

const GroupTrip = () => {
  return (
    <GroupContent mobile={isMobile.toString()}>
      <div className="groupTop">
        <GroupWrap
          mobile={isMobile.toString()}
          image="https://gotogetherpictureupload.s3.ap-northeast-2.amazonaws.com/main/5070_1680797230105.svg"
        >
          <p>액티브 시니어</p>
        </GroupWrap>
        <GroupWrap
          mobile={isMobile.toString()}
          image="https://gotogetherpictureupload.s3.ap-northeast-2.amazonaws.com/main/greece_1680797247227.svg"
        >
          <p>지중해 여행</p>
        </GroupWrap>
      </div>
      <div className="groupBottom">
        <GroupWrap
          mobile={isMobile.toString()}
          image="https://gotogetherpictureupload.s3.ap-northeast-2.amazonaws.com/main/domestic_1680797213741.svg"
        >
          <p>국내 여행</p>
        </GroupWrap>
        <GroupWrap
          mobile={isMobile.toString()}
          image="https://gotogetherpictureupload.s3.ap-northeast-2.amazonaws.com/main/woman_1680797187921.svg"
        >
          <p>여자들만 함께</p>
        </GroupWrap>
        {isMobile ? null : (
          <GroupWrap
            mobile={isMobile.toString()}
            image="https://gotogetherpictureupload.s3.ap-northeast-2.amazonaws.com/main/spring_1680845444037.svg"
          >
            <p>봄 나들이</p>
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
  background-size: 100% 160%;
  /* background-size: cover; */
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
`;
