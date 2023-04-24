import Modal from "react-modal";
import { IconX } from "@tabler/icons-react";
import { useUiStore } from "../../../hooks/useUiStore";

Modal.setAppElement("#root");

export const ModalService = () => {
  const { isServiceModalOpen, closeServiceModal } = useUiStore();

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
        <h2 className="text-center text-4xl font-semibold text-black">
          Información del servicio
        </h2>
        <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-400" />
        <div>I am a modal</div>
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
