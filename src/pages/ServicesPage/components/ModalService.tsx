import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import { IconX } from "@tabler/icons-react";

Modal.setAppElement("#root");

export const ModalService = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
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
  );
};
