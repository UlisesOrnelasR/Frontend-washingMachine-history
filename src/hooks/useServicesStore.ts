import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { Service, UseServicesStoreHook } from "../models/services";
import {
  onSetActiveService,
  onAddNewService,
  onUpdateService,
  onLoadServices,
  onDeleteService,
  onUnSetActiveService,
} from "../store/services/servicesSlice";
import { mock_services } from "../data/services";

export const useServicesStore = (): UseServicesStoreHook => {
  const dispatch = useDispatch();
  const { services, activeService } = useSelector(
    (state: RootState) => state.services
  );

  const setActiveService = (tableService: Service) => {
    dispatch(onSetActiveService(tableService));
  };

  const savingService = (tableService: Service) => {
    // TODO: llegar al backend

    // Todo bien
    if (tableService.id) {
      // Actualizando
      dispatch(onUpdateService({ ...tableService }));
    } else {
      // Creando
      dispatch(
        onAddNewService({ ...tableService, id: Math.random().toString() })
      );
    }
  };

  const deleteService = () => dispatch(onDeleteService());

  const loadingServices = () => dispatch(onLoadServices(mock_services));

  const unSetActiveService = () => dispatch(onUnSetActiveService());

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
    unSetActiveService,
  };
};
