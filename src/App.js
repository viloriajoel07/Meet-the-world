import { faFlag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import Cards from "./components/Cards";
import FloatButton from "./components/FloatButton";
import Modal from "./components/Modal";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [classBlur, setClassBlur] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  // const [filtered, setFiltered]
  let filtered = [];

  const [index, setIndex] = useState(0);
  // let index = 0;

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

  const activeModal = (id) => {
    setIndex(id);
    setShowModal(true);
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

  const changeCountry = (option) => {
    if (option == 1) {
      setIndex(index + 1);
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <main className="">
      <div className="px-8 py-4 flex flex-col md:flex-row justify-center md:justify-between bg-gray-800 h-18 shadow-md shadow-slate-500 fixed w-full z-20">
        <div className="flex w-full">
          <div className="text-3xl font-extrabold md:mr-12 uppercase text-left mb-4 md:mb-0 text-white w-1/2">
            <span className="w-full">Meet the world</span>
          </div>
          <span className="text-white flex items-center flex-row-reverse w-1/2">
            <FontAwesomeIcon icon={faFlag}></FontAwesomeIcon>
          </span>
        </div>
      </div>
      <div
        className={`pt-40 md:pt-24 px-5 blur-md ${
          classBlur === true ? "blur-md" : "blur-none"
        }`}
        id="anchor"
      >
        <div className="flex justify-center mb-8 mt-4">
          <input
            className="bg-white shadow-md appearance-none text-md border border-white rounded-tl rounded-bl w-1/3 p-5 text-gray-700 leading-tight focus:outline-none"
            id="inline-password"
            type="text"
            placeholder="Search a country"
            onChange={handleChange}
          />
          <button
            className="border-t shadow-lg border-b border-r px-6 py-2 border border-sky-500 rounded-tr rounded-br bg-sky-500 text-white "
            onClick={() => setShowModal(true)}
          >
            search
          </button>
        </div>
        <div className="flex flex-wrap items-center justify-center">
          {filtered.map((country, index) => (
            <Cards
              key={index}
              id={index}
              country={country}
              search={search}
              handleModal={(id) => {
                setClassBlur(true);
                activeModal(id);
              }}
            />
          ))}
        </div>
      </div>
      <Modal
        showModal={showModal}
        countries={filtered}
        position={index}
        hiddenModal={() => {
          setClassBlur(false);
          setShowModal(false);
        }}
        next={() => {
          const option = 1;
          changeCountry(option);
        }}
        before={() => {
          const option = 2;
          changeCountry(option);
        }}
      />
      <FloatButton
        handleModal={() => {
          const id = index;
          setClassBlur(true);
          activeModal(id);
        }}
      />
    </main>
  );
};

export default App;
