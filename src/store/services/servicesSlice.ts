import {
  createSlice,
  SliceCaseReducers,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ServicesState, Service } from "../../models/services";

const mockEvent: Service = {
  id: "1",
  cliente: "Juan Gonzales",
  fecha: "12/12/2022",
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
    services: [mockEvent],
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
    onLogoutServices: (state) => {
      state.isLoadingServices = false;
      state.services = [];
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
  },
});

// Action creators are generated for each case reducer function
export const {
  onSetActiveService,
  onAddNewService,
  onUpdateService,
  onDeleteService,
  onLogoutServices,
} = servicesSlice.actions;
