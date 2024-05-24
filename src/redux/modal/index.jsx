import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showDetailTaskModal: false,
  dataDetailTaskModal: {},
  countReloadFetching :0
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.showDetailTaskModal = true;
      state.dataDetailTaskModal = action.payload;
    },
    closeModal: (state) => {
      state.showDetailTaskModal = false;
    },
    reloadFetching: (state)=>{
    state.countReloadFetching ++; 
    }
  },
});

export const { openModal, closeModal,reloadFetching } = modalSlice.actions;
export default modalSlice.reducer;
