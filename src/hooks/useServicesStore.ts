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
  const { user } = useSelector((state: RootState) => state.auth);

  const setActiveService = (tableService: Service) => {
    dispatch(onSetActiveService(tableService));
  };

  const savingService = async (tableService: Service) => {
    try {
      // Todo bien
      if (tableService.id) {
        // Actualizando
        await wmApi.put(`/services/${tableService.id}`, tableService);
        dispatch(onUpdateService({ ...tableService }));
        Swal.fire(
          "Servicio actualizado",
          "El servicio ha sido actualizado",
          "success"
        );
        return;
      }
      //creando un nuevo evento
      const { data } = await wmApi.post("/services", tableService);
      console.log(data);
      dispatch(
        onAddNewService({
          ...tableService,
          id: data.service.id,
        })
      );
      Swal.fire("Servicio guardado", "El servicio ha sido guardado", "success");
    } catch (error: any) {
      console.log(error);
      Swal.fire(
        "Error on save event",
        "No se pudo guardar el servicio",
        "error"
      );
    }
  };

  const deleteService = async () => {
    try {
      if (!activeService) {
        Swal.fire({
          title: "Error",
          text: "No se ha seleccionado ningún servicio",
          icon: "error",
        });
        throw new Error("No se ha seleccionado ningún servicio");
      }
      await wmApi.delete(`/services/${activeService.id}`);
      dispatch(onDeleteService());
    } catch (error: any) {
      Swal.fire({
        title: "Error",
        text: error.response.data.msg || "Error al eliminar el servicio",
        icon: "error",
      });
      console.log(error);
    }
  };

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
