import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
  children: ReactNode;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const status: String = "authenticated"; // "checking"  "authenticated"  "not-authenticated"

  if (status === "checking") {
    return <h2>Loading</h2>;
  }

  return status === "authenticated" ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" replace />
  );
};
