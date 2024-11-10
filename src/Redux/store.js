import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice"; // Import the reducer

const store = configureStore({
  reducer: {
    search: searchReducer, // Correct way to add the search reducer
  },
});

export default store;
