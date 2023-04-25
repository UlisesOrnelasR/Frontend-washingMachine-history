import { createSlice, SliceCaseReducers } from "@reduxjs/toolkit";
import { UiState } from "../../models/ui";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isServiceModalOpen: false,
  } as UiState,
  reducers: {
    onOpenServiceModal: (state) => {
      state.isServiceModalOpen = true;
    },
    onCloseServiceModal: (state) => {
      state.isServiceModalOpen = false;
    },
  } as SliceCaseReducers<UiState> & {
    onOpenServiceModal: (state: UiState) => void;
    onCloseServiceModal: (state: UiState) => void;
  },
});

// Action creators are generated for each case reducer function
export const { onOpenServiceModal, onCloseServiceModal } = uiSlice.actions;
