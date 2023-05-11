import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import {
  onCheckLogin,
  onLogin,
  onLogout,
  clearErrorMessage,
} from "../store/auth/authSlice";
import { onLogoutServices } from "../store/services/servicesSlice";

export const useAuthStore = () => {
  const dispatch = useDispatch();
  const { status, user, errorMessage } = useSelector(
    (state: RootState) => state.auth
  );

  const startLogin = async (email: string, password: string) => {
    dispatch(onCheckLogin());
    try {
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
  };
};
