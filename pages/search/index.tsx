import Input from '@/components/common/Input';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { RxDotsHorizontal } from 'react-icons/rx';
import { IoSearchOutline } from 'react-icons/io5';
import Product from '../product';
import { getStorage, setStorage, removeStorage } from '@/utils/storage';
import { useDispatch } from 'react-redux';
import { setModal } from '@/store/modal';
import { MESSAGES } from '@/constants/messages';
import PageTitle from '@/components/common/PageTitle';
import Button from '@mui/material/Button';
import { Chip, InputBase, TextField } from '@mui/material';

const Search = () => {
  const dispatch = useDispatch();
  const [showProduct, setShowProduct] = useState(false);
  const [showKeyword, setShowkeyword] = useState(true);
  const [recentKeywords, setRecentKeywords] = useState([]);
  const [keyword, setKeyword] = useState('');
  const keywordRef = useRef<any>(null);

  useEffect(() => {
    setStorage('recentKeywords', '골프');
    setStorage('recentKeywords', '가족');
    setStorage('recentKeywords', '유럽');
    setStorage('recentKeywords', '프랑스');
    setStorage('recentKeywords', '바다');
    setStorage('recentKeywords', '낚시');

    setRecentKeywords(getStorage('recentKeywords'));
    return () => {
      removeStorage('recentKeywords');
    };
  }, []);

  const handleClickSearch = (keyword?: string) => {
    if (!keyword && !keywordRef.current.value) {
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.PRODUCT.CHECK_KEYWORD,
        }),
      );
    }

    setShowProduct(true);
    setShowkeyword(false);
    setKeyword(keyword ? keyword : keywordRef.current.value);
    setStorage('recentKeywords', keyword ? keyword : keywordRef.current.value);
    setRecentKeywords(getStorage('recentKeywords'));
    keywordRef.current.blur();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.nativeEvent.isComposing === false && event.key) === 'Enter') {
      handleClickSearch();
    }
  };

  const handleFocusSearch = () => {
    setShowkeyword(true);
  };

  const recommendKeywords = ['연인', '프랑스', '반려동물 동반', '등산', '도시'];

  return (
    <Container>
      <PageTitle title="상품 검색" />
      <SearchInputWrap>
        <TextField
          placeholder="검색어를 입력해 주세요."
          size="small"
          ref={keywordRef}
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          onFocus={handleFocusSearch}
          onKeyDown={handleKeyDown}
        />
        <Button variant="text" onClick={() => handleClickSearch()}>
          <IoSearchOutline size={'22px'} />
        </Button>
      </SearchInputWrap>
      {showKeyword && (
        <>
          <RecentKeywords>
            <KeywordsHeader>
              <p>최근 검색어</p>
              <MenuList>
                <Button variant="text">전체 삭제</Button>
                <Button variant="text">자동저장 끄기</Button>
              </MenuList>
            </KeywordsHeader>
            <Keywords>
              {recentKeywords &&
                recentKeywords.map((item: string, idx: number) => (
                  <Chip
                    key={idx}
                    label={item}
                    variant="outlined"
                    onDelete={() => console.log('delete')}
                    onClick={() => handleClickSearch(item)}
                  />
                ))}
            </Keywords>
          </RecentKeywords>
          <RecommendKeywords>
            <KeywordsHeader>
              <p>인기 여행지</p>
            </KeywordsHeader>
            <Keywords>
              {recommendKeywords.map((item, idx) => (
                <Chip
                  key={idx}
                  label={item}
                  variant="outlined"
                  onDelete={() => console.log('delete')}
                  onClick={() => handleClickSearch(item)}
                />
              ))}
            </Keywords>
          </RecommendKeywords>
        </>
      )}
      {showProduct && <Product type="search" />}
    </Container>
  );
};

export default Search;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const SearchInputWrap = styled.div`
  display: flex;
`;

const RecentKeywords = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RecommendKeywords = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const KeywordsHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Keywords = styled.div`
  display: flex;
  gap: 10px;
`;

const MenuList = styled.ul`
  display: flex;
  gap: 10px;
`;
