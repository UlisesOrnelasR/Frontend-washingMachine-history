import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
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

const user = {
  uid: Math.random().toString(),
  name: "Ulises",
};

export const ModalService = () => {
  const { isServiceModalOpen, closeServiceModal } = useUiStore();
  const {
    setActiveService,
    activeService,
    savingService,
    unSetActiveService,
    deleteService,
  } = useServicesStore();
  const [formSubmited, setFormSubmited] = useState(false);

  const [formValues, setFormValues] = useState({
    customer: "",
    date: format(new Date(), "yyyy-MM-dd"),
    brand: "",
    fault: "",
    changed_parts: "",
    service_cost: 0,
    address: "",
  });

  useEffect(() => {
    if (activeService !== null) {
      setFormValues({
        ...activeService,
      });
    }
  }, [activeService]);

  const handleCloseModal = () => {
    closeServiceModal();
    setFormSubmited(false);
    setFormValues({
      customer: "",
      date: format(new Date(), "yyyy-MM-dd"),
      brand: "",
      fault: "",
      changed_parts: "",
      service_cost: 0,
      address: "",
    });
    unSetActiveService();
  };

  const onDateChanged = (date: Date) => {
    setFormValues({
      ...formValues,
      date: format(date, "yyyy-MM-dd"),
    });
  };

  const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmited(true);

    // Checking that all fields are filled
    const hasEmptyFields = Object.values(formValues).some(
      (value) => value === ""
    );
    if (hasEmptyFields) {
      Swal.fire("Campos vacíos", "Revisar los campos ingresados", "error");
      return;
    }
    savingService({
      ...formValues,
      user,
    });
    handleCloseModal();
    setFormSubmited(false);
  };

  const handleDelete = () => {
    deleteService();
    closeServiceModal();
  };

  return (
    <Modal
      isOpen={isServiceModalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={handleCloseModal}
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
        <form onSubmit={onSubmit}>
          <div className="my-2 flex gap-2">
            <div className="w-full">
              <label htmlFor="fecha" className="block font-semibold mb-1">
                Fecha:
              </label>
              <DatePicker
                id="fecha"
                locale="es"
                dateFormat="MMMM d, yyyy"
                selected={parseISO(formValues.date)}
                onChange={(date: Date) => onDateChanged(date)}
                className="w-full py-2 px-3 rounded-xl outline-none text-dark bg-gray-300 text-sm"
              />
            </div>
            <div className="">
              <label htmlFor="marca" className="block font-semibold mb-1">
                Marca:
              </label>
              <input
                name="brand"
                type="text"
                value={formValues.brand}
                onChange={onInputChange}
                className="w-full py-2 px-3 rounded-xl outline-none text-dark bg-gray-300 text-sm"
              />
            </div>
          </div>
          <div className="my-2 flex gap-2">
            <div className="">
              <label htmlFor="marca" className="block font-semibold mb-1">
                Cliente:
              </label>
              <input
                name="customer"
                type="text"
                value={formValues.customer}
                onChange={onInputChange}
                className="w-full py-2 px-3 rounded-xl outline-none text-dark bg-gray-300 text-sm"
              />
            </div>
            <div className="">
              <label htmlFor="marca" className="block font-semibold mb-1">
                Falla:
              </label>
              <input
                name="fault"
                type="text"
                value={formValues.fault}
                onChange={onInputChange}
                className="w-full py-2 px-3 rounded-xl outline-none text-dark bg-gray-300 text-sm"
              />
            </div>
          </div>

          <div className="my-2">
            <label htmlFor="marca" className="block font-semibold mb-1">
              Piezas cambiadas:
            </label>
            <input
              name="changed_parts"
              type="text"
              value={formValues.changed_parts}
              onChange={onInputChange}
              className="w-full py-2 px-3 rounded-xl outline-none text-dark bg-gray-300 text-sm"
            />
          </div>
          <div className="my-2">
            <label htmlFor="marca" className="block font-semibold mb-1">
              Costo del servicio:
            </label>
            <input
              name="service_cost"
              type="number"
              min={0}
              value={formValues.service_cost}
              onChange={onInputChange}
              className="w-full py-2 px-3 rounded-xl outline-none text-dark bg-gray-300 text-sm"
            />
          </div>
          <div className="my-2">
            <label htmlFor="marca" className="block font-semibold mb-1">
              Domicilio:
            </label>
            <input
              name="address"
              type="text"
              value={formValues.address}
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
            <button
              type="button"
              className="flex items-center gap-1 border border-red-600 bg-red-600 text-white py-2 px-4 hover:bg-red-800 hover:border-red-800  rounded-xl transition-colors"
              onClick={handleDelete}
            >
              <IconTrash />
              Eliminar
            </button>
          </div>
        </form>
        <button
          onClick={handleCloseModal}
          className="absolute top-0 right-0 hover:scale-110 duration-300 transition ease-in-out"
        >
          <IconX size={25} color="red" />
        </button>
      </div>
    </Modal>
  );
};
