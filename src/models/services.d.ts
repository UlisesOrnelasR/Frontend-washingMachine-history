export interface User {
  uid: string;
  name: string;
}

export interface Service {
  id?: string;
  cliente: string;
  fecha: string;
  marca: string;
  falla: string;
  piezas_cambiadas: string;
  costo_servicio: number;
  domicilio: string;
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
