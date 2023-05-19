import { authSlice, onLogin } from "../../../src/store/auth/authSlice";
import { initialState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe("Pruebas en authSlice", () => {
  test("Debe de regresar el estado por defecto", () => {
    // console.log(authSlice.getInitialState());
    // console.log(initialState);
    expect(authSlice.getInitialState()).toEqual(initialState);
  });
  test("Debe de realizar un login", () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
    // console.log(state);
    expect(state).toEqual({
      status: "authenticated",
      user: testUserCredentials,
      errorMessage: undefined,
    });
  });
});
