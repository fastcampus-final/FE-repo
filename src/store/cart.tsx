import { ICart } from '@/interfaces/cart';
import { createSlice } from '@reduxjs/toolkit';

const cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCartState(state, action) {
      return (state = action.payload);
    },
    editCartState(state, action) {
      state.map((item: ICart) => {
        if (item.cartId === action.payload.cartId) {
          item.numberOfPeople = action.payload.numberOfPeople;
          item.singleRoomNumber = action.payload.singleRoomNumber;
          item.option.productOptionId = action.payload.productOptionId;
        }
      });
      return state;
    },
    deleteCartState(state, action) {
      return (state = state.filter((item: ICart) => item.cartId !== action.payload));
    },
  },
});

export const { setCartState, editCartState, deleteCartState } = cart.actions;

export default cart;
