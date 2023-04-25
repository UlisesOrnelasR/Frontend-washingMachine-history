import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { servicesSlice } from "./services/servicesSlice";

export interface RootState {
  ui: ReturnType<typeof uiSlice.reducer>;
  services: ReturnType<typeof servicesSlice.reducer>;
}

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    services: servicesSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
