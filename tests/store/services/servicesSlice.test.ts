import { format } from "date-fns";
import {
  onAddNewService,
  onDeleteService,
  onLoadServices,
  onLogoutServices,
  onSetActiveService,
  onUpdateService,
  servicesSlice,
} from "../../../src/store/services/servicesSlice";
import {
  initialState,
  appWithServicesState,
  services,
  appWithActiveServiceState,
} from "../../fixtures/servicesStates";

describe("Pruebas en servicesSlice", () => {
  test("Debe de regresar el estado inicial", () => {
    // console.log(servicesSlice.getInitialState());
    expect(servicesSlice.getInitialState()).toEqual(initialState);
  });

  test("onSetActiveService debe de activar el servicio", () => {
    // console.log(appWithServicesState);
    const state = servicesSlice.reducer(
      appWithServicesState,
      onSetActiveService(services[0])
    );
    // console.log(state);
    expect(state.activeService).toEqual(services[0]);
  });

  test("onAddNewService debe de agregar un nuevo servicio ", () => {
    const newService = {
      id: "123",
      customer: "Estephanie",
      date: format(new Date(), "yyyy-MM-dd"),
      brand: "Maytag",
      fault: "No sacaba el agua",
      changed_parts: "Bomba",
      service_cost: 999,
      address: "Juarez #290 col. Centro",
      user: {
        uid: "64593ea01d158f1211a898e9",
        name: "testUser",
      },
    };
    const state = servicesSlice.reducer(
      appWithServicesState,
      onAddNewService(newService)
    );
    // console.log(state);
    expect(state.services).toContain(newService);
  });

  test("onUpdateService debe de actualizar un servicio ", () => {
    const updatedService = {
      id: "1",
      customer: "Estephanie",
      date: format(new Date(), "yyyy-MM-dd"),
      brand: "Maytag",
      fault: "No sacaba el agua",
      changed_parts: "Bomba de agua",
      service_cost: 9999,
      address: "Juarez #290 col. El llano",
      user: {
        uid: "64593ea01d158f1211a898e9",
        name: "testUser",
      },
    };
    const state = servicesSlice.reducer(
      appWithServicesState,
      onUpdateService(updatedService)
    );
    // console.log(state);
    expect(state.services).toContain(updatedService);
  });

  test("onDeleteService debe de eliminar el servicio activo", () => {
    const state = servicesSlice.reducer(
      appWithActiveServiceState,
      onDeleteService()
    );
    // console.log(state);
    expect(state.activeService).toBeNull();
    expect(state.services).toHaveLength(1);
  });

  test("onLoadServices debe de cargar los servicios", () => {
    const state = servicesSlice.reducer(initialState, onLoadServices(services));
    // console.log(state);
    expect(state.services).toEqual(services);
    expect(state.isLoadingServices).toBeFalsy();

    // Probando que no se sobreescriban los servicios
    const newState = servicesSlice.reducer(state, onLoadServices(services));
    // console.log(newState);
    expect(newState.services.length).toBe(services.length);
  });

  test("onLogoutServices debe de limpiar el estado", () => {
    const state = servicesSlice.reducer(
      appWithServicesState,
      onLogoutServices()
    );
    // console.log(state);
    expect(state).toEqual(initialState);
  });
});
