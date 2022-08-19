import { useState } from "react";

export const useSearch = (countries = []) => {
  const [search, setSearch] = useState("");
  let filtered = [];

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  if (!search) {
    filtered = countries;
  } else {
    countries.filter((country) => {
      if (
        // search name, region
        country.name.common
          .toLowerCase()
          .includes(search.toLocaleLowerCase()) ||
        country.region.toLowerCase().includes(search.toLocaleLowerCase())
      ) {
        filtered.push(country);
      } else {
        // Search language
        if (country.languages) {
          const language = country.languages;
          const lan = Object.values(language);
          lan.map((language) => {
            if (language.toLowerCase().includes(search.toLocaleLowerCase())) {
              filtered.push(country);
            }
          });
        } else {
        }
      }
      if (country.capital) {
        // search capital
        country.capital.map((capital) => {
          if (capital.toLowerCase().includes(search.toLocaleLowerCase())) {
            filtered.push(country);
          }
        });
      }
    });
  }

  return {
    search,
    filtered,
    handleChange,
  };
};
