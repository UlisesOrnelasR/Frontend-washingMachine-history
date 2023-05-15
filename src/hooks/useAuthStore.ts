import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
      navigate("/");
    } catch (error: any) {
      dispatch(onLogout(error.response.data?.msg || "---"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const startRegister = async ({
    email,
    password,
    name,
    lastName,
  }: {
    email: string;
    password: string;
    name: string;
    lastName: string;
  }) => {
    dispatch(onCheckLogin());
    try {
      const response = wmApi.post("/auth/register", {
        email,
        password,
        name,
        lastName,
      });
      const { data } = await response;
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
      navigate("/");
    } catch (error: any) {
      dispatch(onLogout(error.response.data?.msg || "---"));
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const response = wmApi.get("/auth/renew");
      const { data } = await response;
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime().toString());
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
      dispatch(onLogoutServices());
    }
  };

  const startLogout = () => {
    localStorage.clear();
    dispatch(onLogout());
    dispatch(onLogoutServices());
    navigate("/login");
  };

  return {
    //* Propiedades
    errorMessage,
    status,
    user,

    //* Métodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
