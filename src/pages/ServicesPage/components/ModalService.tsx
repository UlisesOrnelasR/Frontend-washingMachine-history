import { useEffect, useState } from "react";
import Modal from "react-modal";
import { IconX, IconDeviceFloppy, IconTrash } from "@tabler/icons-react";
import { useUiStore } from "../../../hooks/useUiStore";
import { useServicesStore } from "../../../hooks/useServicesStore";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

registerLocale("es", es);
Modal.setAppElement("#root");

export const ModalService = () => {
  const { isServiceModalOpen, closeServiceModal } = useUiStore();
  const { activeService, savingService } = useServicesStore();
  const [formSubmited, setFormSubmited] = useState(false);

  const [formValues, setFormValues] = useState({
    fecha: format(new Date(), "yyyy-MM-dd"),
    marca: "",
    falla: "",
    piezas_cambiadas: "",
    costo_servicio: "",
    domicilio: "",
  });

  useEffect(() => {
    if (activeService !== null) {
      setFormValues({
        ...activeService,
      });
    }
  }, [activeService]);

  const onDateChanged = (date: Date) => {
    setFormValues({
      ...formValues,
      fecha: format(date, "yyyy-MM-dd"),
    });
  };

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  return (
    <Modal
      isOpen={isServiceModalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeServiceModal}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
      contentLabel="ModalService"
    >
      <div className="relative py-8">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-black">
          Información del servicio
        </h2>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-400" />
        <form action="">
          <div className="my-2 flex gap-2">
            <div className="w-full">
              <label htmlFor="fecha" className="block font-semibold mb-1">
                Fecha:
              </label>
              <DatePicker
                id="fecha"
                locale="es"
                dateFormat="MMMM d, yyyy"
                selected={parseISO(formValues.fecha)}
                onChange={(date: Date) => onDateChanged(date)}
                className="w-full py-2 px-3 rounded-xl outline-none text-dark bg-gray-300 text-sm"
              />
            </div>
            <div className="">
              <label htmlFor="marca" className="block font-semibold mb-1">
                Marca:
              </label>
              <input
                name="marca"
                type="text"
                value={formValues.marca}
                onChange={onInputChange}
                className="w-full py-2 px-3 rounded-xl outline-none text-dark bg-gray-300 text-sm"
              />
            </div>
          </div>
          <div className="my-2">
            <label htmlFor="marca" className="block font-semibold mb-1">
              Falla:
            </label>
            <input
              name="falla"
              type="text"
              value={formValues.falla}
              onChange={onInputChange}
              className="w-full py-2 px-3 rounded-xl outline-none text-dark bg-gray-300 text-sm"
            />
          </div>
          <div className="my-2">
            <label htmlFor="marca" className="block font-semibold mb-1">
              Piezas cambiadas:
            </label>
            <input
              name="piezas_cambiadas"
              type="text"
              value={formValues.piezas_cambiadas}
              onChange={onInputChange}
              className="w-full py-2 px-3 rounded-xl outline-none text-dark bg-gray-300 text-sm"
            />
          </div>
          <div className="my-2">
            <label htmlFor="marca" className="block font-semibold mb-1">
              Costo del servicio:
            </label>
            <input
              name="costo_servicio"
              type="text"
              value={formValues.costo_servicio}
              onChange={onInputChange}
              className="w-full py-2 px-3 rounded-xl outline-none text-dark bg-gray-300 text-sm"
            />
          </div>
          <div className="my-2">
            <label htmlFor="marca" className="block font-semibold mb-1">
              Domicilio:
            </label>
            <input
              name="domicilio"
              type="text"
              value={formValues.domicilio}
              onChange={onInputChange}
              className="w-full py-2 px-3 rounded-xl outline-none text-dark bg-gray-300 text-sm"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <button
              className="flex items-center gap-1 bg-secondary text-white py-3 px-4 rounded-xl hover:bg-tertiary transition-colors"
              type="submit"
            >
              <IconDeviceFloppy />
              Guardar
            </button>
            <button className="flex items-center gap-1 border border-red-600 bg-red-600 text-white py-2 px-4 hover:bg-red-800 hover:border-red-800  rounded-xl transition-colors">
              <IconTrash />
              Eliminar
            </button>
          </div>
        </form>
        <button
          onClick={closeServiceModal}
          className="absolute top-0 right-0 hover:scale-110 duration-300 transition ease-in-out"
        >
          <IconX size={25} color="red" />
        </button>
      </div>
    </Modal>
  );
};
