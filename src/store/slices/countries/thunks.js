import { setCountries, startLoading } from "./countriesSlice";

export const getCountries = () => {
  return async (dispatch, getState) => {
    dispatch(startLoading());
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setCountries({ countries: data }));
      });
  };
};
