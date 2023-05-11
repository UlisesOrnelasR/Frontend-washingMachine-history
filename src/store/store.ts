import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { servicesSlice } from "./services/servicesSlice";
import { authSlice } from "./auth/authSlice";

export interface RootState {
  ui: ReturnType<typeof uiSlice.reducer>;
  services: ReturnType<typeof servicesSlice.reducer>;
  auth: ReturnType<typeof authSlice.reducer>;
}

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    services: servicesSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
