import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addSearchTerm: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
