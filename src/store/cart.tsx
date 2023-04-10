import { ICart } from '@/interfaces/cart';
import { createSlice } from '@reduxjs/toolkit';

const cart = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    setCartState(state, action) {
      return (state = action.payload);
    },
    deleteCartState(state, action) {
      return (state = state.filter((item: ICart) => item.cartId !== action.payload));
    },
  },
});

export const { setCartState, deleteCartState } = cart.actions;

export default cart;
