import { faFlag, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cards from "./components/Cards";
import FloatButton from "./components/FloatButton";
import Modal from "./components/Modal";
import { useModal } from "./hooks/useModal";
import { useSearch } from "./hooks/useSearch";
import { getCountries } from "./store/slices/countries";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const stateCountries = useSelector((state) => state.countries);

  const { countries, isLoading } = stateCountries;

  const { search, filtered, handleChange } = useSearch(countries);
  const {
    activeModal,
    hiddenModal,
    index,
    changeCountry,
    showModal,
    classBlur,
  } = useModal({
    showModal: false,
    classBlur: false,
  });

  return (
    <main className="">
      <div className="px-8 py-4 flex flex-col md:flex-row justify-center md:justify-between bg-gray-800 h-18 fixed w-full z-20">
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
        className={`pt-40 md:pt-24 px-8 ${classBlur && "blur-md"}`}
        id="anchor"
      >
        <div className="flex justify-center mb-8 mt-4">
          <div className="bg-white border rounded-xl flex items-center justify-center relative p-2 w-full sm:w-[24rem] shadow-md">
            <input
              className="appearance-none text-md rounded-tl rounded-bl text-gray-700 leading-tight focus:outline-none w-full p-3"
              id="inline-password"
              type="text"
              placeholder="Search a country"
              onChange={handleChange}
            />
            <span className="flex items-center justify-center absolute right-4 text-gray-600 font-bold">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center">
          {isLoading ? (
            <span>Loading...</span>
          ) : (
            filtered.map((country, index) => (
              <Cards
                key={index}
                id={index}
                country={country}
                search={search}
                handleModal={(id) => {
                  activeModal(id);
                }}
              />
            ))
          )}
          {filtered.length === 0 && isLoading === false ? (
            <div className="w-full flex flex-col justify-center">
              <p className="text-3xl mb-4 font-bold text-slate-800 text-center">
                COUNTRY NOT FOUND
              </p>
              <span className="w-56 text-center font-bold text-slate-800 text-xl m-auto text-ellipsis overflow-hidden whitespace-nowrap">
                {search}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <Modal
        showModal={showModal}
        countries={filtered}
        position={index}
        hiddenModal={() => {
          hiddenModal();
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
      {/* <FloatButton
        handleModal={() => {
          const id = index;
          activeModal(id);
        }}
      /> */}
    </main>
  );
};

export default App;
