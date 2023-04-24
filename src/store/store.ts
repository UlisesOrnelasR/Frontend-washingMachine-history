import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";

export interface RootState {
  ui: ReturnType<typeof uiSlice.reducer>;
}

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
