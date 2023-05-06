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
  costo_servicio: "400",
  domicilio: "Calle 123",
  user: {
    uid: "1",
    name: "Ulises",
  },
};

export const servicesSlice = createSlice({
  name: "services",
  initialState: {
    isLoadingServices: false,
    services: [mockService],
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
