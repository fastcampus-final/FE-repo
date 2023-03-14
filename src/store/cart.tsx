import { createSlice } from '@reduxjs/toolkit';

const cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setLikeState(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setLikeState } = cart.actions;

export default cart;
