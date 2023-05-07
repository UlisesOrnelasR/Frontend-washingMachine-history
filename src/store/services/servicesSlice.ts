import {
  createSlice,
  SliceCaseReducers,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ServicesState, Service } from "../../models/services";
import { format } from "date-fns";

const mockService: Service = {
  id: "1",
  cliente: "Juan Gonzales",
  fecha: format(new Date(), "yyyy-MM-dd"),
  marca: "Whirpool",
  falla: "Golpeaba la tina",
  piezas_cambiadas: "amortiguadores",
  costo_servicio: 300,
  domicilio: "Calle 123",
  user: {
    uid: "1",
    name: "Ulises",
  },
};

const mockService2: Service = {
  id: "2",
  cliente: "Erika Machain",
  fecha: format(new Date("2022-10-12"), "yyyy-MM-dd"),
  marca: "Samsung",
  falla: "Tiraba Agua",
  piezas_cambiadas: "Transmision",
  costo_servicio: 2500,
  domicilio: "Calle juarez #555",
  user: {
    uid: "1",
    name: "Ulises",
  },
};

const mockService3: Service = {
  id: "3",
  cliente: "Angelica Martinez",
  fecha: format(new Date("2022-05-01"), "yyyy-MM-dd"),
  marca: "Keemore",
  falla: "No exprime",
  piezas_cambiadas: "Sensor Tapa",
  costo_servicio: 800,
  domicilio: "Calle Zaragoza #444",
  user: {
    uid: "1",
    name: "Ulises",
  },
};

const mockService4: Service = {
  id: "4",
  cliente: "Hermelinda Montero",
  fecha: format(new Date("2023-02-14"), "yyyy-MM-dd"),
  marca: "LG",
  falla: "No cae agua a la tina",
  piezas_cambiadas: "Electrovalvulas",
  costo_servicio: 1200,
  domicilio: "Calle Quinta del refugio #16",
  user: {
    uid: "1",
    name: "Ulises",
  },
};

export const servicesSlice = createSlice({
  name: "services",
  initialState: {
    isLoadingServices: false,
    services: [mockService, mockService2, mockService3, mockService4],
    activeService: null,
  } as ServicesState,
  reducers: {
    onSetActiveService: (state, action: PayloadAction<Service>) => {
      state.activeService = action.payload;
    },
    onAddNewService: (state, action: PayloadAction<Service>) => {
      state.services.push(action.payload);
      state.activeService = null;
    },
    onUpdateService: (state, action: PayloadAction<Service>) => {
      state.services = state.services.map((service) => {
        if (service.id === action.payload.id) {
          return action.payload;
        }
        return service;
      });
    },
    onDeleteService: (state) => {
      if (state.activeService) {
        state.services = state.services.filter(
          (service) => service.id !== state.activeService!.id
        );
        state.activeService = null;
      }
    },
    onLoadServices: (state, { payload = [] }) => {
      state.isLoadingServices = false;
      // state.events = payload;
      payload.forEach((service) => {
        const exists = state.services.some(
          (dbEvent) => dbEvent.id === service.id
        );
        if (!exists) {
          state.services.push(service);
        }
      });
    },
    onLogoutServices: (state) => {
      state.isLoadingServices = false;
      state.services = [];
      state.activeService = null;
    },
    onUnSetActiveService: (state) => {
      state.activeService = null;
    },
  } as SliceCaseReducers<ServicesState> & {
    onLogoutServices: (state: ServicesState) => void;
    onDeleteService: (state: ServicesState) => void;
    onUpdateService: (
      state: ServicesState,
      action: PayloadAction<Service>
    ) => void;
    onAddNewService: (
      state: ServicesState,
      action: PayloadAction<Service>
    ) => void;
    onSetActiveService: (
      state: ServicesState,
      action: PayloadAction<Service>
    ) => void;
    onLoadServices: (
      state: ServicesState,
      action: PayloadAction<Service[]>
    ) => void;
    onUnSetActiveService: (state: ServicesState) => void;
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveService,
  onAddNewService,
  onUpdateService,
  onDeleteService,
  onLogoutServices,
  onLoadServices,
  onUnSetActiveService,
} = servicesSlice.actions;
