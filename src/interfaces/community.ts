export interface IReview {
  boardId: number;
  userName: string;
  boardType: string;
  boardThumbnail: string;
  boardTitle: string;
  createdDate: string;
}

export interface IReviewDetail {
  boardId: number;
  userName: string;
  boardType: string;
  boardTitle: string;
  boardContent: string;
  createdDate: string;
  updatedDate: string;
}
