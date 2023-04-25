import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { UseUiStoreHook } from "../models/ui";
import { onOpenServiceModal, onCloseServiceModal } from "../store/ui/uiSlice";

export const useUiStore = (): UseUiStoreHook => {
  const dispatch = useDispatch();

  const { isServiceModalOpen } = useSelector((state: RootState) => state.ui);

  const openServiceModal: () => void = () => {
    dispatch(onOpenServiceModal());
  };

  const closeServiceModal: () => void = () => {
    dispatch(onCloseServiceModal());
  };

  return {
    // Propiedades
    isServiceModalOpen,
    // Métodos
    openServiceModal,
    closeServiceModal,
  };
};
