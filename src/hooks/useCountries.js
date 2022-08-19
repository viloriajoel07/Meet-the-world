import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCountries } from "../store/slices/countries";

export const useCountries = (initialState = {}) => {
  const [onCountries, setOnCountries] = useState(initialState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  return {
    ...onCountries,
    onCountries,
  };
};
