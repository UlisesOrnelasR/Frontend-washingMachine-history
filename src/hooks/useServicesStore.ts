import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { Service, UseServicesStoreHook } from "../models/services";
import {
  onSetActiveService,
  onAddNewService,
  onUpdateService,
  onLoadServices,
  onDeleteService,
} from "../store/services/servicesSlice";

const servicesArray: Service[] = [
  {
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
  },
  {
    id: "2",
    cliente: "Pwlon Bañuelos",
    fecha: "10/09/2022",
    marca: "GE",
    falla: "Tiraba agua",
    piezas_cambiadas: "Bomba de agua",
    costo_servicio: "700",
    domicilio: "Calle 456",
    user: {
      uid: "1",
      name: "Ulises",
    },
  },
];

export const useServicesStore = (): UseServicesStoreHook => {
  const dispatch = useDispatch();
  const { services, activeService } = useSelector(
    (state: RootState) => state.services
  );

  const setActiveService = (tableService: Service) =>
    dispatch(onSetActiveService(tableService));

  const savingService = (tableService: Service) =>
    dispatch(onAddNewService(tableService));

  const deleteService = () => dispatch(onDeleteService());

  const loadingServices = () => dispatch(onLoadServices(servicesArray));

  return {
    // Propiedades
    services,
    activeService,
    hasServiceSelected: !!activeService,
    // Métodos
    setActiveService,
    savingService,
    deleteService,
    loadingServices,
  };
};
