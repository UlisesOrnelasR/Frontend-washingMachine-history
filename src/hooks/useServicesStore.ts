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
import Swal from "sweetalert2";
import { wmApi } from "../api";

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

  const loadingServices = async () => {
    try {
      const response = wmApi.get("/services");
      const { data } = await response;
      console.log(data);
      dispatch(onLoadServices(data.services));
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Error al cargar los servicios",
        icon: "error",
      });
      console.log(error);
    }
  };

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
