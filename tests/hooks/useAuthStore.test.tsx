import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { renderHook, act } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store/auth/authSlice";
import { AuthStates } from "../../src/models/auth";
import { initialState } from "../fixtures/authStates";
import { BrowserRouter } from "react-router-dom";

const getMockStore = (initialState: AuthStates) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe("Pruebas en el hook useAuthStore", () => {
  test("Debe de retornar los valores por defecto", () => {
    const mockStore = getMockStore({
      ...initialState,
    });
    const wrapper = ({ children }: any) => (
      <Provider store={mockStore}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
    const { result } = renderHook(() => useAuthStore(), {
      wrapper,
    });
    // console.log(result.current);
    expect(result.current).toEqual({
      errorMessage: undefined,
      status: "checking",
      user: {},
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });
});
