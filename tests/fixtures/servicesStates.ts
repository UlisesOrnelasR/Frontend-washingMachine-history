import { format } from "date-fns";
import { Service, ServicesState } from "../../src/models/services";

export const services: Array<Service> = [
  {
    id: "1",
    customer: "Juan Gonzales",
    date: format(new Date(), "yyyy-MM-dd"),
    brand: "Whirpool",
    fault: "Golpeaba la tina",
    changed_parts: "amortiguadores",
    service_cost: 350,
    address: "Calle 123",
    user: {
      uid: "64593ea01d158f1211a898e9",
      name: "testUser",
    },
  },
  {
    id: "2",
    customer: "Erika Machain",
    date: format(new Date(), "yyyy-MM-dd"),
    brand: "Easy",
    fault: "No tiene fuerza al lavar",
    changed_parts: "motor",
    service_cost: 100,
    address: "Zaragoza #999 Oriente",
    user: {
      uid: "64593ea01d158f1211a898e9",
      name: "testUser",
    },
  },
];

export const initialState: ServicesState = {
  isLoadingServices: true,
  services: [],
  activeService: null,
};

export const appWithServicesState: ServicesState = {
  isLoadingServices: false,
  services: [...services],
  activeService: null,
};

export const appWithActiveServiceState: ServicesState = {
  isLoadingServices: false,
  services: [...services],
  activeService: { ...services[0] },
};
