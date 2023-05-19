import { AuthStates } from "../../src/models/auth";

export const initialState: AuthStates = {
  status: "checking", // checking, authenticated, not-authenticated,
  user: {},
  errorMessage: undefined,
};

export const authenticatedState: AuthStates = {
  status: "authenticated", // checking, authenticated, not-authenticated,
  user: {
    uid: "123ABC",
    name: "TestUser",
  },
  errorMessage: undefined,
};

export const NotAuthenticatedState: AuthStates = {
  status: "not-authenticated", // checking, authenticated, not-authenticated,
  user: {},
  errorMessage: undefined,
};
