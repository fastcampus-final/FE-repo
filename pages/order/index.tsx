import PageTitle from '@/components/common/PageTitle';
import { useRouter } from 'next/router';
import React from 'react';
import Image from '@/components/common/Image';
import { useEffect } from 'react';
import { useState } from 'react';
import OrderItem from '@/components/Order/OrderItem';
import { ICart } from '@/interfaces/cart';
import { formatPrice } from '@/utils/format';
import Link from 'next/link';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setModal } from '@/store/modal';
import { MESSAGES } from '@/constants/messages';
import { useForm } from 'react-hook-form';

const index = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    // watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [items, setItems] = useState([]);
  const [allCheck, setAllCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [payCheck, setPayCheck] = useState(false);

  useEffect(() => {
    if (router.query.items === undefined) {
      dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.ORDER.EXPIRE,
        }),
      );
      router.back();
    } else {
      setItems(JSON.parse(router.query.items as string));
    }
  }, [router.query.items]);

  useEffect(() => {
    if (useCheck && payCheck) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [useCheck, payCheck]);

  Object.values(errors).map((error) => {
    dispatch(
      setModal({
        isOpen: true,
        onClickOk: () => dispatch(setModal({ isOpen: false })),
        text: error?.message,
      }),
    );
  });

  // console.log(Object.values(errors));

  return (
    <div>
      <PageTitle title="결제하기" />
      <form
        onSubmit={handleSubmit(async (data) => {
          console.log(data);
          // router.push('/order/success')
        })}
      >
        <div>
          <div>예약 상품 정보</div>
          {items.map((item, idx) => (
            <OrderItem key={idx} item={item} />
          ))}
        </div>
        <div>
          <div>예약자 정보</div>
          <div>
            <input
              type="text"
              placeholder="이름"
              {...register('name', {
                required: MESSAGES.INPUT.CHECK.NAME,
                pattern: {
                  value: /[가-힣]{3,4}/,
                  message: MESSAGES.INPUT.ERROR.NAME_PATTERN,
                },
                maxLength: {
                  value: 4,
                  message: MESSAGES.INPUT.ERROR.NAME_MAX,
                },
              })}
            />
            <input
              type="text"
              placeholder="연락처"
              {...register('phone', {
                required: MESSAGES.INPUT.CHECK.PHONE,
                pattern: {
                  value: /[0-9]{3}[0-9]{3,4}[0-9]{4}/,
                  message: MESSAGES.INPUT.ERROR.PHONE_PATTERN,
                },
                maxLength: {
                  value: 11,
                  message: MESSAGES.INPUT.ERROR.PHONE_MAX,
                },
              })}
            />
            <input
              type="text"
              placeholder="이메일(선택)"
              {...register('email', {
                pattern: {
                  value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: MESSAGES.INPUT.ERROR.EMAIL_PATTERN,
                },
              })}
            />
          </div>
        </div>
        <div>
          <div>주문 요약</div>
          <div>
            <div>
              <div>상품가격</div>
              {items.map((item: ICart, idx) => (
                <div key={idx}>{formatPrice(item.productPrice)}</div>
              ))}
            </div>
            <div>
              <div>총 예약금액</div>
              <div>{router.query.amount}</div>
            </div>
          </div>
        </div>
        <div>
          <div>결제수단</div>
        </div>
        <div>
          <div>
            <input
              type="checkbox"
              id="allAgree"
              {...register('allAgree', {
                required: MESSAGES.INPUT.CHECK.AGREE,
              })}
              checked={allCheck}
              onChange={(event) => {
                if (event.target.checked) {
                  setAllCheck(true);
                  setUseCheck(true);
                  setPayCheck(true);
                } else {
                  setAllCheck(false);
                  setUseCheck(false);
                  setPayCheck(false);
                }
              }}
            />
            <label htmlFor="allAgree">전체 동의</label>
          </div>
          <div>
            <div>
              <input
                type="checkbox"
                id="useAgree"
                checked={useCheck}
                onChange={() => (useCheck ? setUseCheck(false) : setUseCheck(true))}
              />
              <label htmlFor="useAgree">개인정보 수집 및 이용 동의</label>
              <Link href="/">
                <span>약관보기</span>
              </Link>
            </div>
            <div>
              <input
                type="checkbox"
                id="payAgree"
                checked={payCheck}
                onChange={() => (payCheck ? setPayCheck(false) : setPayCheck(true))}
              />
              <label htmlFor="payAgree">예약조건 확인 및 결제진행에 동의</label>
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            결제하기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default index;
