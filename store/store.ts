import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import squadsReducer from './slices/squadsSlice';
// ভবিষ্যতে এখানে chatSlice, coinSlice যোগ করবেন

export const store = configureStore({
  reducer: {
    auth: authReducer,
    squads: squadsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;