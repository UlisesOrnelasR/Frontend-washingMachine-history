import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Modal from "react-modal";
import { IconX } from "@tabler/icons-react";

Modal.setAppElement("#root");

export const Table = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
        contentLabel="ModalService"
      >
        <div className="relative py-8">
          <h2 className="text-center text-4xl font-semibold text-black">
            Información del servicio
          </h2>
          <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-400" />
          <div>I am a modal</div>
          <button
            onClick={closeModal}
            className="absolute top-0 right-0 hover:scale-110 duration-300 transition ease-in-out"
          >
            <IconX size={25} color="red" />
          </button>
        </div>
      </Modal>
      <div className="overflow-x-auto">
        <table className="w-full divide-y-2 divide-gray-200 text-sm">
          <thead className="text-left ">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-text">
                Cliente
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-text">
                Fecha
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-text">
                Marca
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-text">
                Falla
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-text">
                Piezas cambiadas
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-text">
                Se cobró
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-bold text-text">
                Domicilio
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-bold text-text">
                John Doe
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-text">
                {format(new Date(2014, 6, 27), "do 'de' MMMM yyyy", {
                  locale: es,
                })}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-text">
                Web Developer
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-text">
                Tiraba agua
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-text max-w-sm overflow-x-auto">
                Actuador y sensor
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-text">$500</td>
              <td className="whitespace-nowrap px-4 py-2 text-text">
                Calle 123 # 45-67
              </td>

              <td className="whitespace-nowrap px-4 py-2">
                <p
                  onClick={openModal}
                  className="inline-block rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-700"
                >
                  Editar
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
