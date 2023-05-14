import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ServicesPage, LoginPage, RegisterPage } from "../pages";
import { PrivateRoute } from "./PrivateRoute";
import { Layout } from "../components";
import { useAuthStore } from "../hooks/useAuthStore";

export const AppRouter = () => {
  const { checkAuthToken } = useAuthStore();
  useEffect(() => {
    checkAuthToken();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <ServicesPage />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
