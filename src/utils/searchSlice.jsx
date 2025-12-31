import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cache: {},
  query: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    cacheResults: (state, action) => {
      state.cache = { ...state.cache, ...action.payload };
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { cacheResults, setQuery } = searchSlice.actions;

export default searchSlice.reducer;