import { uiSlice } from "../../../src/store/ui/uiSlice";

describe("Pruebas en uiSlice", () => {
  test("Debe de regresar el estado por defecto", () => {
    // console.log(uiSlice.getInitialState());
    expect(uiSlice.getInitialState()).toEqual({
      isServiceModalOpen: false,
    });
  });
  test("Debe de cambiar el estado de isServiceModalOpen", () => {
    // console.log(uiSlice);
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, uiSlice.actions.onOpenServiceModal());
    expect(state.isServiceModalOpen).toBeTruthy();
    state = uiSlice.reducer(state, uiSlice.actions.onCloseServiceModal());
    expect(state.isServiceModalOpen).toBeFalsy();
  });
});
