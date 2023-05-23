import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { renderHook, act } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store/auth/authSlice";
import { AuthStates } from "../../src/models/auth";
import { NotAuthenticatedState, initialState } from "../fixtures/authStates";
import { BrowserRouter } from "react-router-dom";
import { testUser, testUserCredentials } from "../fixtures/testUser";

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
  beforeEach(() => localStorage.clear()); // Limpiar el local storage en cada test para que no este afectado por otro.

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

  test("startLogin debe de realizar el login correctamente", async () => {
    const mockStore = getMockStore({
      ...NotAuthenticatedState,
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
    const { startLogin } = result.current;
    await act(async () => {
      await startLogin(testUserCredentials);
    });
    // console.log(result.current);
    expect(result.current.status).toBe("authenticated");
    expect(result.current.user).toEqual(testUser);
    expect(result.current.errorMessage).toBeUndefined();
    expect(localStorage.getItem("token")).toEqual(expect.any(String));
  });

  test("startLogin debe ded fallar en el login", async () => {
    const mockStore = getMockStore({
      ...NotAuthenticatedState,
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
    const { startLogin } = result.current;
    await act(async () => {
      await startLogin({
        email: "fakeEmail@gmail.com",
        password: "fake-password",
      });
    });
    // console.log(result.current);
    expect(result.current.status).toBe("not-authenticated");
    expect(typeof result.current.errorMessage).toBe("string");
    expect(result.current.user).toEqual({});
    expect(localStorage.getItem("token")).toBeNull();
  });

  test("startRegister debe de realizar el registro correctamente", () => {
    const newUser = {
      email: "example@gmail.com",
      password: "123456",
      name: "ExampleUser",
      lastName: "Pérez",
    };

    const mockStore = getMockStore({
      ...NotAuthenticatedState,
    });
    const wrapper = ({ children }: any) => (
      <Provider store={mockStore}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
    const { result } = renderHook(() => useAuthStore(), {
      wrapper,
    });
    console.log(result.current);
    const { startRegister } = result.current;
  });
});
