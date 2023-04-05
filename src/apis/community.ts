import { API_URLS } from '@/constants/apiUrls';
import { instance } from './instance';

export const getBoardList = async (type: string, pageNumber: number) => {
  const { data } = await instance.get(API_URLS.BOARD(type, pageNumber));
  return data;
};

export const getBoardSearchList = async (type: string, keyword: string, pageNumber: number) => {
  const { data } = await instance.get(API_URLS.BOARD_SEARCH(type, keyword, pageNumber));
  return data;
};

export const postBoardAdd = async (data: {
  boardContent: string;
  boardThumbnail: string;
  boardTitle: string;
  boardType: string;
}) => {
  const res = await instance.post(API_URLS.BOARD_ADD, data);
  return res;
};

export const patchBoardEdit = async (
  boardId: number,
  data: {
    boardContent: string;
    boardThumbnail: string;
    boardTitle: string;
  },
) => {
  const res = await instance.patch(API_URLS.BOARD_EDIT(boardId), data);
  return res;
};

export const deleteBoard = async (boardID: number) => {
  try {
    const res = await instance.delete(API_URLS.BOARD_EDIT(boardID));
    return res;
  } catch (e: any) {
    return e.code;
  }
};

export const getBoardDetail = async (boardId: number) => {
  const { data } = await instance.get(API_URLS.BOARD_DETAIL(boardId));
  return data;
};
