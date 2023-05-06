import { IconDatabasePlus } from "@tabler/icons-react";
import { useUiStore } from "../../../hooks/useUiStore";

export const AddButton = () => {
  const { openServiceModal } = useUiStore();

  const handleAddService = () => {
    openServiceModal();
  };

  return (
    <button
      onClick={handleAddService}
      className="fixed bottom-8 right-8 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
    >
      <IconDatabasePlus />
      <span className="ml-2">Agregar</span>
    </button>
  );
};
