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
import { mock_services } from "../data/services";

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

  const loadingServices = () => dispatch(onLoadServices(mock_services));

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
