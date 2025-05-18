import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "create", // or "update"
  selectedFormData: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormMode: (state, action) => {
      state.mode = action.payload;
    },
    setSelectedFormData: (state, action) => {
      state.selectedFormData = action.payload;
    },
    resetForm: (state) => {
      state.mode = "create";
      state.selectedCategory = null;
    },
  },
});

export const { setFormMode, setSelectedFormData, resetForm } = formSlice.actions;
export default formSlice.reducer;