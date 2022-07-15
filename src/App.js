import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Cards from "./components/Cards";
import FloatButton from "./components/FloatButton";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  let filtered = [];

  useEffect(() => {
    api();
  }, []);

  const api = async () => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      });
  };

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

  return (
    <main className="">
      <div className="px-8 py-4 flex flex-col md:flex-row justify-center md:justify-between bg-gray-800 h-18 shadow-md shadow-slate-500 fixed w-full">
        <div className="flex w-full">
          <div className="text-3xl font-extrabold md:mr-12 uppercase text-left mb-4 md:mb-0 text-white w-1/2">
            <span className="w-full">Meet the world</span>
          </div>
          <span className="text-white flex items-center flex-row-reverse w-1/2">
            <FontAwesomeIcon icon={faFlag}></FontAwesomeIcon>
          </span>
        </div>
      </div>
      <div className="body pt-40 md:pt-24 px-5" id="anchor">
        <div className="flex justify-center mb-8 mt-4">
          <input
            className="bg-white shadow-md appearance-none text-md border border-white rounded-tl rounded-bl w-1/3 p-5 text-gray-700 leading-tight focus:outline-none"
            id="inline-password"
            type="text"
            placeholder="Search a country"
            onChange={handleChange}
          />
          <button className="border-t shadow-lg border-b border-r px-6 py-2 border border-sky-500 rounded-tr rounded-br bg-sky-500 text-white ">
            search
          </button>
        </div>
        <Cards countries={filtered} search={search} />
      </div>
      <FloatButton />
    </main>
  );
}

export default App;
