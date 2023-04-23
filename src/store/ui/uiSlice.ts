import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name:  'ui',
    initialState: {
        isServiceModalOpen: false
    },
    reducers: {
        onOpenServiceModal: (state) => {
            state.isServiceModalOpen = true;
        }
        ,
        onCloseServiceModal: (state) => {
            state.isServiceModalOpen = false;
        }
    }
})

// Action creators are generated for each case reducer function
export const { onOpenServiceModal } = uiSlice.actions;