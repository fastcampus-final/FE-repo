import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import React, { useState } from 'react';
import styled from 'styled-components';
import { RxDotsHorizontal } from 'react-icons/rx';
import { IoSearchOutline } from 'react-icons/io5';
import Product from '../product';

const Search = () => {
  const [showProduct, setShowProduct] = useState(false);
  const [showKeyword, setShowkeyword] = useState(true);

  const handleClickKeyword = () => {
    // ...
  };

  const handleClickSearch = () => {
    setShowProduct(true);
    setShowkeyword(false);
  };

  const recentKeywords = ['골프', '가족', '유럽', '일본', '바다', '낚시', '프랑스'];
  const recommendKeywords = ['연인', '프랑스', '반려동물 동반', '등산', '도시'];

  return (
    <Container>
      <SearchInputWrap>
        {/* <Input type="text" placeholder="검색어를 입력해 주세요." /> */}
        <input type="text" placeholder="검색어를 입력해 주세요." />
        <Button variant="transparent" onClick={handleClickSearch}>
          <IoSearchOutline size={'22px'} />
        </Button>
      </SearchInputWrap>
      <RecentKeywords>
        <KeywordsHeader>
          <p>최근 검색어</p>
          <MenuList>
            <Button variant="transparent">
              <RxDotsHorizontal size="14px" />
            </Button>
            <Button variant="transparent">선택 삭제</Button>
            <Button variant="transparent">전체 삭제</Button>
            <Button variant="transparent">자동저장 끄기</Button>
          </MenuList>
        </KeywordsHeader>
        <Keywords>
          {recentKeywords.map((item, idx) => (
            <Button
              key={idx}
              type="button"
              onClick={handleClickKeyword}
              borderRadius="50px"
              variant="white"
              padding="18px"
              height="30px"
            >
              {item}
            </Button>
          ))}
        </Keywords>
      </RecentKeywords>
      <RecommendKeywords>
        <KeywordsHeader>
          <p>추천 검색어</p>
        </KeywordsHeader>
        <Keywords>
          {recommendKeywords.map((item, idx) => (
            <Button
              key={idx}
              type="button"
              onClick={handleClickKeyword}
              borderRadius="50px"
              variant="blue"
              padding="18px"
              height="30px"
            >
              {item}
            </Button>
          ))}
        </Keywords>
      </RecommendKeywords>
      {showProduct && <Product />}
    </Container>
  );
};

export default Search;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
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
