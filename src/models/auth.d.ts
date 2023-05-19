export interface User {
  uid: string;
  name: string;
}

export interface AuthStates {
  status: string;
  user: {};
  errorMessage: string | undefined;
}

interface UserCredentials {
  email: string;
  password: string;
}

export interface UseAuthStoreHook extends AuthStates {}
