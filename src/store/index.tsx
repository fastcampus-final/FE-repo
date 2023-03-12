import { configureStore } from '@reduxjs/toolkit';
import like from './like';

const store = configureStore({
  reducer: {
    like: like.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
