import { API_URLS } from '@/constants/apiUrls';
import { instance } from './instance';

export const getBoardList = async (type: string, pageNumber: number, keyword?: string) => {
  const { data } = await instance.get(API_URLS.BOARD.BOARD_BY_TYPE(type, keyword, pageNumber));
  return data;
};

export const postBoardAdd = async (data: {
  boardContent: string;
  boardThumbnail: string;
  boardTitle: string;
}) => {
  const res = await instance.post(API_URLS.BOARD.BOARD, data);
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
  const res = await instance.patch(API_URLS.BOARD.BOARD_BY_ID(boardId), data);
  return res;
};

export const deleteBoard = async (boardID: number) => {
  try {
    const res = await instance.delete(API_URLS.BOARD.BOARD_BY_ID(boardID));
    return res;
  } catch (e: any) {
    return e.code;
  }
};

export const getBoardDetail = async (boardId: number) => {
  const { data } = await instance.get(API_URLS.BOARD.BOARD_BY_ID(boardId));
  return data;
};
