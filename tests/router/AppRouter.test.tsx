import React from "react";
import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../src/hooks/useAuthStore");

describe("Pruebas en AppRouter", () => {
  const mockCheckAuthToken = jest.fn();
  beforeEach(() => jest.clearAllMocks());
  beforeEach(() => jest.clearAllTimers()); //Para limpiar los intervalos, en este suite no es necesario

  test("Debe de llamar checkAuthToken al montarse", () => {
    (useAuthStore as jest.Mock).mockReturnValue({
      checkAuthToken: mockCheckAuthToken,
    });
    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );
    // screen.debug();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });
});
