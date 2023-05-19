import { wmApi } from "../../src/api";

describe("Pruebas en wmApi", () => {
  test("Debe de tener la configuracion por defecto", () => {
    // console.log(wmApi);
    // console.log(process.env.VITE_API_URL);
    expect(wmApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });
});
