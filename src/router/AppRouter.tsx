import { Routes, Route, Navigate } from "react-router-dom";
import { ServicesPage, LoginPage, RegisterPage } from "../pages";
import { PrivateRoute } from "./PrivateRoute";
import { Layout } from "../components";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/" element={<Layout />}>
          <Route
            path="/services"
            element={
              <PrivateRoute>
                <ServicesPage />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
};
