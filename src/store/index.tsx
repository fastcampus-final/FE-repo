import { configureStore } from '@reduxjs/toolkit';
import cart from './cart';
import loading from './loading';
import modal from './modal';

const store = configureStore({
  reducer: {
    loading: loading.reducer,
    cart: cart.reducer,
    modal: modal.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
