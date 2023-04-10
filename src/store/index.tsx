import { configureStore } from '@reduxjs/toolkit';
import cart from './cart';
import loading from './loading';
import modal from './modal';
import wish from './wish';

const store = configureStore({
  reducer: {
    loading: loading.reducer,
    cart: cart.reducer,
    wish: wish.reducer,
    modal: modal.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
