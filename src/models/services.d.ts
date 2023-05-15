import { User } from "./auth";

export interface Service {
  id?: string;
  customer: string;
  date: string;
  brand: string;
  fault: string;
  changed_parts: string;
  service_cost: number;
  address: string;
  user: User;
}

export interface ServicesState {
  isLoadingServices: boolean;
  services: Service[];
  activeService: Service | null;
}

export interface UseServicesStoreHook
  extends Omit<ServicesState, "isLoadingServices"> {
  hasServiceSelected: boolean;
  setActiveService: (service: Service) => void;
  savingService: (service: Service) => void;
  deleteService: () => void;
  loadingServices: () => void;
  unSetActiveService: () => void;
}
