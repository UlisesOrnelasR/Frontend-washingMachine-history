export interface User {
  uid: string;
  name: string;
}

export interface Service {
  id: string;
  cliente: string;
  fecha: string;
  marca: string;
  falla: string;
  piezas_cambiadas: string;
  costo_servicio: string;
  domicilio: string;
  user: User;
}

export interface ServicesState {
  isLoadingServices: boolean;
  services: Service[];
  activeService: Service | null;
}
