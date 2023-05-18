import {
  createSlice,
  SliceCaseReducers,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ServicesState, Service } from "../../models/services";
// import { format } from "date-fns";

// const mockService: Service = {
//   id: "1",
//   customer: "Juan Gonzales",
//   date: format(new Date(), "yyyy-MM-dd"),
//   brand: "Whirpool",
//   fault: "Golpeaba la tina",
//   changed_parts: "amortiguadores",
//   service_cost: 300,
//   address: "Calle 123",
//   user: {
//     uid: "1",
//     name: "Ulises",
//   },
// };

// const mockService2: Service = {
//   id: "2",
//   customer: "Erika Machain",
//   date: format(new Date("2022-10-12"), "yyyy-MM-dd"),
//   brand: "Samsung",
//   fault: "Tiraba Agua",
//   changed_parts: "Transmision",
//   service_cost: 2500,
//   address: "Calle juarez #555",
//   user: {
//     uid: "1",
//     name: "Ulises",
//   },
// };

// const mockService3: Service = {
//   id: "3",
//   customer: "Angelica Martinez",
//   date: format(new Date("2022-05-01"), "yyyy-MM-dd"),
//   brand: "Keemore",
//   fault: "No exprime",
//   changed_parts: "Sensor Tapa",
//   service_cost: 800,
//   address: "Calle Zaragoza #444",
//   user: {
//     uid: "1",
//     name: "Ulises",
//   },
// };

// const mockService4: Service = {
//   id: "4",
//   customer: "Hermelinda Montero",
//   date: format(new Date("2023-02-14"), "yyyy-MM-dd"),
//   brand: "LG",
//   fault: "No cae agua a la tina",
//   changed_parts: "Electrovalvulas",
//   service_cost: 1200,
//   address: "Calle Quinta del refugio #16",
//   user: {
//     uid: "1",
//     name: "Ulises",
//   },
// };

export const servicesSlice = createSlice({
  name: "services",
  initialState: {
    isLoadingServices: false,
    services: [],
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
