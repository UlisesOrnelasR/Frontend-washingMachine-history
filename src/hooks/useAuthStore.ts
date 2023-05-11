import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  onCheckLogin,
  onLogin,
  onLogout,
  clearErrorMessage,
} from "../store/auth/authSlice";
import { onLogoutServices } from "../store/services/servicesSlice";
import { wmApi } from "../api";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const startLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(onCheckLogin());
    try {
      const response = wmApi.post("/auth", { email, password });
      const { data } = await response;
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error: any) {
      dispatch(onLogout(error.response.data?.msg || "---"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  return {
    //* Propiedades
    errorMessage,
    status,
    user,

    //* Métodos
    startLogin,
  };
};
