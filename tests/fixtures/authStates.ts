interface AuthState {
  status: string;
  user: {};
  errorMessage: string | undefined;
}

export const initialState: AuthState = {
  status: "checking", // checking, authenticated, not-authenticated,
  user: {},
  errorMessage: undefined,
};

export const authenticatedState: AuthState = {
  status: "authenticated", // checking, authenticated, not-authenticated,
  user: {
    uid: "123ABC",
    name: "TestUser",
  },
  errorMessage: undefined,
};

export const NotAuthenticatedState: AuthState = {
  status: "not-authenticated", // checking, authenticated, not-authenticated,
  user: {},
  errorMessage: undefined,
};
