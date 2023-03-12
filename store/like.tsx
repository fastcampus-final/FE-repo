import { createSlice } from '@reduxjs/toolkit';

const like = createSlice({
  name: 'like',
  initialState: [],
  reducers: {
    setLikeState(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setLikeState } = like.actions;

export default like;
