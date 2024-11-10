import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyWord: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    search: (state, action) => {
      state.keyWord = action.payload;
    },
  },
});

export const { search } = searchSlice.actions; // Exporting the search action
export default searchSlice.reducer; // Exporting the reducer
