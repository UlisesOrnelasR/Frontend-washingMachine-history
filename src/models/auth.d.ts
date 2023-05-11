export interface User {
  uid: string;
  name: string;
}

export interface AuthStates {
  status: string;
  user: {};
  errorMessage: string | undefined;
}

export interface UseAuthStoreHook extends AuthStates {}
