export interface UiState {
    isServiceModalOpen: boolean;
  }

  export interface UiHook {
    isServiceModalOpen: boolean;
    openServiceModal: () => void;
    closeServiceModal: () => void;
  }