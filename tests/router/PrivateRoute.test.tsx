import React from "react";
import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { MemoryRouter, Route, Routes } from "react-router-dom";

jest.mock("../../src/hooks/useAuthStore");

describe("Pruebas en PrivateRoute", () => {
  const mockCheckAuthToken = jest.fn();
  beforeEach(() => jest.clearAllMocks());
  beforeEach(() => jest.clearAllTimers()); //Para limpiar los intervalos, en este suite no es necesario

  test("Debe renderizar Loading si el status es 'checking'", () => {
    (useAuthStore as jest.Mock).mockReturnValue({
      checkAuthToken: mockCheckAuthToken,
      status: "checking",
    });
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>{<div>Contenido protegido</div>}</PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    // screen.debug();
    expect(screen.getByText("Loading")).toBeTruthy();
  });

  test("Debe renderizar el contenido cuando el usuario está autenticado", () => {
    (useAuthStore as jest.Mock).mockReturnValue({
      checkAuthToken: mockCheckAuthToken,
      status: "authenticated",
    });
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>{<div>Contenido protegido</div>}</PrivateRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );
    // screen.debug();
    expect(screen.getByText("Contenido protegido")).toBeTruthy();
  });

  test("Debe redireccionar al login si no está autenticado", () => {
    (useAuthStore as jest.Mock).mockReturnValue({
      checkAuthToken: mockCheckAuthToken,
      status: "not-authenticated",
    });
    render(
      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>{<div>Contenido protegido</div>}</PrivateRoute>
            }
          />
          <Route path="/login" element={<div>Login</div>} />
        </Routes>
      </MemoryRouter>
    );
    // screen.debug();
    // expect(screen.getByText("Contenido protegido")).toBeTruthy();
    expect(screen.queryByText("Contenido protegido")).toBeFalsy();
    expect(screen.getByText("Login")).toBeTruthy();
  });
});
