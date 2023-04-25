export interface UiState {
  isServiceModalOpen: boolean;
}

export interface UseUiStoreHook extends UiState {
  openServiceModal: () => void;
  closeServiceModal: () => void;
}
