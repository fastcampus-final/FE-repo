import { IWishList } from '@/interfaces/wishlist';
import { createSlice } from '@reduxjs/toolkit';

const wish = createSlice({
  name: 'wish',
  initialState: [],
  reducers: {
    setWishState(state, action) {
      return (state = action.payload);
    },
    deleteWishState(state, action) {
      return (state = state.filter((item: IWishList) => item.wishlistId !== action.payload));
    },
  },
});

export const { setWishState, deleteWishState } = wish.actions;

export default wish;
