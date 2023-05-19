import {
  authSlice,
  clearErrorMessage,
  onCheckLogin,
  onLogin,
  onLogout,
} from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState } from "../../fixtures/authStates";
import { testUser } from "../../fixtures/testUser";

describe("Pruebas en authSlice", () => {
  test("Debe de regresar el estado por defecto", () => {
    // console.log(authSlice.getInitialState());
    // console.log(initialState);
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test("Debe de realizar un login", () => {
    const state = authSlice.reducer(initialState, onLogin(testUser));
    // console.log(state);
    expect(state).toEqual({
      status: "authenticated",
      user: testUser,
      errorMessage: undefined,
    });
  });

  test("Debe de realizar un logout", () => {
    const state = authSlice.reducer(authenticatedState, onLogout());
    // console.log(state);
    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: undefined,
    });
  });

  test("Debe de hacer un logout con mensaje de error", () => {
    const errorMessage = "Credenciales no validas";
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    // console.log(state);
    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage,
    });
  });

  test("Debe de limpiar el mensaje de error", () => {
    const errorMessage = "Credenciales no validas";
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    // console.log(state);
    const newState = authSlice.reducer(state, clearErrorMessage());
    // console.log(newState);
    expect(newState.errorMessage).toBeUndefined();
  });

  test("Debe de cambiar el estado cuando se dispara el onCheckLogin", () => {
    const state = authSlice.reducer(authenticatedState, onCheckLogin());
    expect(state).toEqual(initialState);
  });
});
