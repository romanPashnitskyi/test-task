import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../..";

import {
  SignUpFormModel,
  AuthResponse,
  StatusCode,
  AuthState,
  AuthData,
  SignInFormModel,
  LoadingStatusCode,
} from "../../../../models/auth";
import {
  getFromLocalStorage,
  saveInLocalStorage,
  removeFromLocalStorage,
} from "../../../../utils/common";

export const signUp = createAsyncThunk<AuthData | null, SignUpFormModel>(
  "auth/signUp",
  async (payload) => {
    const { token, status } = await api
      .post<AuthResponse>(`/users`, payload)
      .then(({ data }) => data);

    if (status === StatusCode.Success) {
      const user = { email: payload.email, token };
      saveInLocalStorage("user", { token });

      const signUpResponse = {
        user,
        status,
      };

      return signUpResponse;
    }

    return null;
  }
);

export const signIn = createAsyncThunk<AuthData | null, SignInFormModel>(
  "auth/signIn",
  async (payload) => {
    const { token, status } = await api
      .post<AuthResponse>(`/sessions`, payload)
      .then(({ data }) => data);

    if (status === StatusCode.Success) {
      const user = { email: payload.email, token };
      saveInLocalStorage("user", { token });

      const signInResponse = {
        user,
        status,
      };

      return signInResponse;
    }

    return null;
  }
);

const initialState: AuthState = {
  user: getFromLocalStorage("user") || null,
  statusCode: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    logOut(state) {
      removeFromLocalStorage("user");
      state.user = null;
    },
  },
  extraReducers: {
    [signUp.pending.toString()]: (state) => {
      state.statusCode = LoadingStatusCode.Loading;
    },
    [signUp.fulfilled.toString()]: (state, { payload }) => {
      if (!!payload) {
        state.statusCode = LoadingStatusCode.Success;
        state.user = payload.user;
      } else {
        state.statusCode = LoadingStatusCode.Error;
      }
    },
    [signUp.rejected.toString()]: (state, { payload }) => {
      state.statusCode = LoadingStatusCode.Error;
    },
    [signIn.pending.toString()]: (state) => {
      state.statusCode = LoadingStatusCode.Loading;
    },
    [signIn.fulfilled.toString()]: (state, { payload }) => {
      if (!!payload) {
        state.statusCode = LoadingStatusCode.Success;
        state.user = payload.user;
      } else {
        state.statusCode = LoadingStatusCode.Error;
      }
    },
    [signIn.rejected.toString()]: (state, { payload }) => {
      state.statusCode = LoadingStatusCode.Error;
    },
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
