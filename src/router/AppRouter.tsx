import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { ServicesPage } from "../pages";

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ServicesPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
};
