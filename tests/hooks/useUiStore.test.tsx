import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { renderHook } from "@testing-library/react";
import { useUiStore } from "../../src/hooks/useUiStore";
import { uiSlice } from "../../src/store/ui/uiSlice";
import { UiState } from "../../src/models/ui";

const getMockStore = (initialState: UiState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

describe("Pruebas en useUiStore", () => {
  test("Debe de regresar los valores por defecto", () => {
    const mockStore = getMockStore({
      isServiceModalOpen: false,
    });
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    // console.log(result.current);
    expect(result.current).toEqual({
      isServiceModalOpen: false,
      openServiceModal: expect.any(Function),
      closeServiceModal: expect.any(Function),
    });
  });
});
