export interface IMyReview {
  boardId: number;
  boardThumbnail: string;
  boardTitle: string;
  createdDate: string;
}

export interface IMyReviewDetail {
  boardId: number;
  userName: string;
  boardType: string;
  boardTitle: string;
  boardContent: string;
  createdDate: string;
  updatedDate: string;
}
