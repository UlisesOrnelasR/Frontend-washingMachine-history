import {
  createSlice,
  SliceCaseReducers,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AuthStates, User } from "../../models/auth";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking", // checking, authenticated, not-authenticated,
    user: {},
    errorMessage: undefined,
  } as AuthStates,
  reducers: {
    onCheckLogin: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }: PayloadAction<User>) => {
      state.status = "authenticated";
      state.user = payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, action) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = action.payload;
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    },
  } as SliceCaseReducers<AuthStates> & {
    onCheckLogin: (state: AuthStates) => void;
    onLogin: (state: AuthStates, action: PayloadAction<User>) => void;
    onLogout: (
      state: AuthStates,
      action: PayloadAction<string | undefined>
    ) => void;
    clearErrorMessage: (state: AuthStates) => void;
  },
});

// Action creators are generated for each case reducer function
export const { onCheckLogin, onLogin, onLogout, clearErrorMessage } =
  authSlice.actions;
