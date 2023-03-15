import React from 'react';
import Link from 'next/link';
import { FiSearch, FiLogIn } from 'react-icons/fi';
import { ROUTES } from '@/constants/routes';
import { getCookie } from '@/utils/cookie';
import { RxAvatar } from 'react-icons/rx';
import { useRouter } from 'next/router';

const Header = () => {
  const router = useRouter();
  // console.log(getCookie('tokens'));

  return (
    <div>
      <div>
        <div>
          <Link href={ROUTES.HOME}>
            <div>Go Together</div>
          </Link>
        </div>
        <div
          onClick={() => {
            router.push('/search');
          }}
        >
          <input type="text" />
          <div>
            <FiSearch />
          </div>
        </div>
      </div>
      {/* <div>
        <div>
          <Link href={ROUTES.HOME}>
            <div>Go Together</div>
          </Link>
        </div>
        <div>
          <div
            onClick={() => {
              router.push('/search');
            }}
          >
            <div>
              <input type="text" />
              <FiSearch />
            </div>
          </div>
        </div>
        {getCookie('tokens') ? (
          <button
            onClick={() => {
              router.push('/mypage');
            }}
          >
            <RxAvatar />
          </button>
        ) : (
          <div>
            <Link href={ROUTES.LOGIN}>
              <div>
                <FiLogIn />
              </div>
            </Link>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Header;
