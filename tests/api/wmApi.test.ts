import { wmApi } from "../../src/api";

describe("Pruebas en wmApi", () => {
  test("Debe de tener la configuracion por defecto", () => {
    // console.log(wmApi);
    // console.log(process.env.VITE_API_URL);
    expect(wmApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test("Todas las peticiones deben de llevar el token en los headers", async () => {
    const token = "ABC123";
    localStorage.setItem("token", token);
    const response = await wmApi.get("/routeExample"); // Peticion a la API
    // console.log(response);
    // console.log(response.config.headers["x-token"]);
    expect(response.config.headers["x-token"]).toBe(token);
  });
});
