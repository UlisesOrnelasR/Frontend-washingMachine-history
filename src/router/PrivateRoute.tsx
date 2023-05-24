import { useEffect } from "react";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../hooks/useAuthStore";

type PrivateRouteProps = {
  children: ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { status, checkAuthToken } = useAuthStore();

  // const status: String = "authenticated" "checking" "not-authenticated"
  useEffect(() => {
    checkAuthToken();
  }, []);

  console.log(status);

  if (status === "checking") {
    return <h2>Loading</h2>;
  }

  return status === "authenticated" ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};
