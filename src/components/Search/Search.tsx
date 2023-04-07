import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { IoSearchOutline } from 'react-icons/io5';
import { getStorage, setStorage, removeStorage, deleteStorageItem } from '@/utils/storage';
import { useDispatch } from 'react-redux';
import { setModal } from '@/store/modal';
import { MESSAGES } from '@/constants/messages';
import PageTitle from '@/components/common/PageTitle';
import { Chip, TextField, Button, Divider } from '@mui/material';
import { useCookies } from 'react-cookie';
import { getProduct, getProductRecommend } from '@/apis/product';
import { IRecommend } from '../../interfaces/product';

interface Props {
  setPage: any;
  setTotalPage: any;
  setProduct: any;
  keyword: string;
  setKeyword: any;
  setTotalCount: any;
  showProduct: boolean;
  setShowProduct: any;
}

const Search = ({
  setPage,
  setTotalPage,
  setProduct,
  keyword,
  setKeyword,
  setTotalCount,
  showProduct,
  setShowProduct,
}: Props) => {
  const dispatch = useDispatch();
  const [cookies, setCookies, removeCookies] = useCookies();
  const [isSaveRecentKeyword, setIsSaveRecentKeyword] = useState(cookies.isSaveRecentKeyword);
  const [showKeyword, setShowKeyword] = useState(true);
  const [recentKeywords, setRecentKeywords] = useState([]);
  const [recommendKeywords, setRecommendKeywords] = useState<IRecommend[]>([]);

  useEffect(() => {
    setRecentKeywords(getStorage('recentKeywords'));
    (async () => {
      const data = await getProductRecommend();
      setRecommendKeywords(data);
    })();
  }, []);

  const handleClickSearch = async () => {
    if (!keyword) {
      return dispatch(
        setModal({
          isOpen: true,
          onClickOk: () => dispatch(setModal({ isOpen: false })),
          text: MESSAGES.PRODUCT.CHECK_KEYWORD,
        }),
      );
    }
    setShowProduct(true);
    setShowKeyword(false);

    const data = await getProduct(keyword);
    setProduct(data.content);
    setPage(1);
    setTotalPage(data.totalPages);
    setTotalCount(data.totalElements);

    if (isSaveRecentKeyword) {
      setStorage('recentKeywords', keyword);
      setRecentKeywords(getStorage('recentKeywords'));
    }
  };

  const handleClickKeyword = async (item: string) => {
    setShowProduct(true);
    setShowKeyword(false);
    setKeyword(item);

    const data = await getProduct(item);
    setProduct(data.content);
    setPage(1);
    setTotalPage(data.totalPages);
    setTotalCount(data.totalElements);

    if (isSaveRecentKeyword) {
      setStorage('recentKeywords', item);
      setRecentKeywords(getStorage('recentKeywords'));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.nativeEvent.isComposing === false && event.key) === 'Enter') {
      handleClickSearch();
    }
  };

  const handleFocusSearch = () => {
    setShowKeyword(true);
    setShowProduct(false);
  };

  const onDeleteKeyword = (item: string) => {
    deleteStorageItem('recentKeywords', item);
    setRecentKeywords(getStorage('recentKeywords'));
  };

  const onDeleteAllKeyword = () => {
    removeStorage('recentKeywords');
    setRecentKeywords(getStorage('recentKeywords'));
  };

  const onToggleSaveKeyword = () => {
    if (isSaveRecentKeyword) {
      removeCookies('isSaveRecentKeyword');
    } else {
      setCookies('isSaveRecentKeyword', true);
    }
    setIsSaveRecentKeyword((prev: boolean) => !prev);
  };

  return (
    <Container>
      <PageTitle title="상품 검색" />
      <SearchInputWrap>
        <TextField
          placeholder="검색어를 입력해 주세요."
          size="small"
          value={keyword}
          onChange={(event) => {
            if (showProduct) setShowProduct(false);
            if (!showKeyword) setShowKeyword(true);
            setKeyword(event.target.value);
          }}
          onFocus={handleFocusSearch}
          onKeyDown={handleKeyDown}
          fullWidth
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
                {isSaveRecentKeyword && recentKeywords && (
                  <Button variant="text" onClick={onDeleteAllKeyword}>
                    전체 삭제
                  </Button>
                )}
                <Button variant="text" onClick={onToggleSaveKeyword}>
                  {isSaveRecentKeyword ? '자동저장 끄기' : '자동저장 켜기'}
                </Button>
              </MenuList>
            </KeywordsHeader>
            <Keywords>
              {isSaveRecentKeyword ? (
                recentKeywords.length > 0 ? (
                  recentKeywords.map((item: string, idx: number) => (
                    <Chip
                      key={idx}
                      label={item}
                      variant="outlined"
                      onDelete={() => onDeleteKeyword(item)}
                      onClick={() => handleClickKeyword(item)}
                    />
                  ))
                ) : (
                  <p>최근 검색어가 없습니다</p>
                )
              ) : (
                <p>최근 검색어 저장이 꺼져있습니다.</p>
              )}
            </Keywords>
          </RecentKeywords>
          <RecommendKeywords>
            <KeywordsHeader>
              <p>인기 여행지</p>
            </KeywordsHeader>
            <Keywords>
              {recommendKeywords &&
                recommendKeywords.map((item, idx) => (
                  <Button
                    key={idx}
                    variant="contained"
                    onClick={() => handleClickKeyword(item.regionName)}
                  >
                    {item.regionName}
                  </Button>
                ))}
            </Keywords>
          </RecommendKeywords>
        </>
      )}
      <Divider />
    </Container>
  );
};

export default Search;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  max-width: 1200px;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding: 16px 0;
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
  flex-wrap: wrap;
  gap: 10px;
`;

const MenuList = styled.ul`
  display: flex;
  gap: 10px;
`;
