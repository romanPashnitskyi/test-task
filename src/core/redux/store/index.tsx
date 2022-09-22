import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../slices/auth/authSlice";
import moviesReducer from "../slices/movies/moviesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    movies: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
