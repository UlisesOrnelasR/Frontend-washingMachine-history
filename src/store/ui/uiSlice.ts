import { createSlice, SliceCaseReducers} from "@reduxjs/toolkit";

interface UiState {
    isServiceModalOpen: boolean;
  }


export const uiSlice = createSlice({
    name:  'ui',
    initialState: {
        isServiceModalOpen: false
    } as UiState,
    reducers: {
        onOpenServiceModal: (state) => {
            state.isServiceModalOpen = true;
        }
        ,
        onCloseServiceModal: (state) => {
            state.isServiceModalOpen = false;
        }
    } as SliceCaseReducers<UiState> &{
        onOpenServiceModal: (state:  UiState) => void;
        onCloseServiceModal: (state:   UiState) => void;
    },
})

// Action creators are generated for each case reducer function
export const { onOpenServiceModal,onCloseServiceModal } = uiSlice.actions;