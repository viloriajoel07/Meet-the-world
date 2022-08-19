import { createSlice } from "@reduxjs/toolkit";

const countries = createSlice({
  name: "countries",
  initialState: {
    isLoading: false,
    countries: [],
  },
  reducers: {
    startLoading: (state, action) => {
      state.isLoading = true;
    },
    setCountries: (state, action) => {
      state.isLoading = false;
      state.countries = action.payload.countries;
    },
  },
});

export const { setCountries, startLoading } = countries.actions;

export default countries.reducer;
