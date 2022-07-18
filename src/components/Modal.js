import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
const Modal = ({
  showModal,
  hiddenModal,
  position,
  countries,
  next,
  before,
}) => {
  const country = countries[position];
  let detail = {};
  let length = 0;
  if (country) {
    const languages = Object.values(country.languages);
    const currencies = Object.values(country.currencies);
    detail = {
      name: country.name.common,
      flag: country.flags.png,
      region: country.region,
      subregion: country.subregion,
      population: country.population,
      status: country.status,
      officialName: country.name.official,
      capital: country.capital[0],
      currencies: currencies[0].name,
      symbolCurrencies: currencies[0].symbol,
      languages: languages,
      continent: country.continents[0],
    };

    length = countries.length - 1;
  }

  const languagesFunction = (languages) => {
    if (languages) {
      const lan = Object.values(languages);
      let inner = ``;
      lan.map((language) => {
        inner += `<p class="text-md text-gray-700">${language}</p>`;
      });
      return { __html: inner };
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-hidden fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-4xl px-6">
              {/*content*/}
              <div className="border-0 mb-5 rounded-xl shadow-lg relative flex-col w-full md:h-auto bg-white outline-none focus:outline-none">
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="w-full sm:w-2/6">
                    <button
                      className="px-4 py-2 right-0 absolute sm:hidden bg-transparent text-black"
                      onClick={hiddenModal}
                    >
                      <span className="text-black w-6 text-2xl block opacity-70 hover:opacity-100">
                        <FontAwesomeIcon icon={faXmark} />
                      </span>
                    </button>
                    <img
                      src={detail.flag}
                      alt="flag"
                      className="w-full h-full object-fill rounded-t-lg sm:rounded-tr-none sm:rounded-l-xl"
                    />
                  </div>

                  <div className="flex flex-col w-full sm:w-4/6">
                    {/*header*/}
                    <div className="flex items-start justify-between py-3 px-5 border-slate-200 rounded-t">
                      <h3 className="text-3xl font-semibold">{detail.name}</h3>
                      <button
                        className="p-1 ml-auto hidden sm:block bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={hiddenModal}
                      >
                        <span className="text-black w-6 text-2xl block opacity-70 hover:opacity-100 hover:scale-110 transition-all">
                          <FontAwesomeIcon icon={faXmark} />
                        </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative px-8 pt-8 pb-16 flex">
                      <ul className="mr-4">
                        <li className="font-bold text-gray-700 text-md mb-2">
                          Official name:{" "}
                          <span className="font-normal">
                            {detail.officialName}
                          </span>
                        </li>
                        <li className="font-bold text-gray-700 text-md mb-2">
                          Population: {}
                          <span className="font-normal">
                            {detail.population}
                          </span>
                        </li>
                        <li className="font-bold text-gray-700 text-md mb-2">
                          Region: {}
                          <span className="font-normal">{detail.region}</span>
                        </li>
                        <li className="font-bold text-gray-700 text-md mb-2">
                          Sub Region: {}
                          <span className="font-normal">
                            {detail.subregion}
                          </span>
                        </li>
                        <li className="font-bold text-gray-700 text-md mb-2">
                          Capital: {}
                          <span className="font-normal">{detail.capital}</span>
                        </li>
                        <li className="font-bold text-gray-700 text-md mb-2">
                          Staus:{" "}
                          <span className="font-normal">{detail.status}</span>
                        </li>
                      </ul>
                      <ul className="mx-4">
                        <li className="font-bold text-gray-700 text-md mb-2">
                          Continent: {}
                          <span className="font-normal">
                            {detail.continent}
                          </span>
                        </li>
                        <li className="font-bold text-gray-700 text-md mb-2">
                          Currencies: {}
                          <span className="font-normal">
                            {detail.currencies} ({detail.symbolCurrencies})
                          </span>
                        </li>
                        <li className="font-bold text-gray-700 text-md">
                          Languages:{" "}
                          <div
                            className="font-normal"
                            dangerouslySetInnerHTML={languagesFunction(
                              detail.languages
                            )}
                          ></div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigator */}
              <div className="flex justify-center">
                <button
                  className={`border w-14 h-14 rounded-full mx-4 shadow bg-white ${
                    position === 0
                      ? "opacity-50"
                      : "hover:scale-110 transition-all"
                  } `}
                  onClick={() => {
                    before();
                  }}
                  disabled={position === 0 ? true : false}
                >
                  <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <button
                  className={`first-letter:border w-14 h-14 rounded-full mx-4 shadow bg-white  ${
                    position === length
                      ? "opacity-50"
                      : "hover:scale-110 transition-all"
                  } `}
                  onClick={() => {
                    next();
                  }}
                  disabled={position === length ? true : false}
                >
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
export default Modal;
