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
import { wmApi } from "../../src/api/wmApi";

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

  test("startLogin debe de fallar en el login", async () => {
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

  test("startRegister debe de realizar el registro correctamente", async () => {
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
    // console.log(result.current);

    const { startRegister } = result.current;
    const spy = jest.spyOn(wmApi, "post").mockResolvedValue({
      data: {
        ok: true,
        uid: "1263781293",
        name: "ExampleUser",
        token: "ALGUN-TOKEN",
      },
    });
    await act(async () => {
      await startRegister(newUser);
    });
    const { errorMessage, status, user } = result.current;
    // console.log({ errorMessage, status, user });

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "ExampleUser", uid: "1263781293" },
    });

    spy.mockRestore(); // Destruye el espia para que las demas funciones pasen con normalidad
  });

  test("startRegister debe de fallar en la creación de un usuario", async () => {
    const newUser = {
      email: "example@gmail.com",
      password: "123",
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
    // console.log(result.current);

    const { startRegister } = result.current;
    await act(async () => {
      await startRegister(newUser);
    });
    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: expect.any(String),
      status: "not-authenticated",
      user: {},
    });
  });

  test("checkAuthToken debe de fallar si no hay un token en el local storage", async () => {
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
    const { checkAuthToken } = result.current;
    await act(async () => {
      await checkAuthToken();
    });
    const { errorMessage, status, user } = result.current;
    // console.log({ errorMessage, status, user });
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "not-authenticated",
      user: {},
    });
  });

  test("checkAuthToken debe de autenticar un usuario si hay un token", async () => {
    const { data } = await wmApi.post("/auth", testUserCredentials);
    // console.log(data);
    localStorage.setItem("token", data.token);
    const mockStore = getMockStore({
      ...initialState,
    });
    const wrapper = ({ children }: any) => (
      <Provider store={mockStore}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
    // console.log("token", localStorage.getItem("token"));

    const { result } = renderHook(() => useAuthStore(), {
      wrapper,
    });
    // console.log(result.current);
    const { checkAuthToken } = result.current;
    await act(async () => {
      await checkAuthToken();
    });
    const { errorMessage, status, user } = result.current;
    // console.log({ errorMessage, status, user });
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: "authenticated",
      user: { name: "testUser", uid: "64593ea01d158f1211a898e9" },
    });
  });
});
