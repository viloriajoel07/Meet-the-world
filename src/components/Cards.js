import React from "react";

const Card = ({ countries, search }) => {
  const languagesFunction = (languages) => {
    if (languages) {
      const lan = Object.values(languages);
      let inner = ``;
      lan.map((language) => {
        inner += `<span class="px-3 py-1 border rounded mx-1 mb-2 text-gray-600 text-sm hover:bg-gray-200">${language}</span>`;
      });
      return { __html: inner };
    }
  };

  if (countries.length == 0) {
    return (
      <div className="w-full flex flex-col justify-center">
        <p className="text-3xl mb-4 font-bold text-slate-800 text-center">
          COUNTRY NOT FOUND
        </p>
        <span className="w-56 text-center font-bold text-slate-800 text-xl m-auto text-ellipsis overflow-hidden whitespace-nowrap">
          {search}
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap items-center justify-center">
      {countries.map((country, index) => (
        <div
          key={index}
          className="block rounded-lg bg-white shadow-2xl shadow-gray-400 gray-person w-96 text-center m-4"
        >
          <div className="p-6">
            <div className="m-auto w-40 h-40 my-8 rounded-full z-40">
              <img
                src={country.flags.png}
                className="w-full h-full rounded-full border"
                alt=""
              />
            </div>

            <p className="text-xl">{country.name.common}</p>
            <p className="text-sm text-gray-400 mb-2">
              Capital: {country.capital}
            </p>
            <span className="text-sm text-gray-600 mb-4">Languages:</span>
            <div
              id="languages"
              className="my-3 flex flex-wrap justify-center"
              dangerouslySetInnerHTML={languagesFunction(country.languages)}
            ></div>
            <p className="text-gray-700 text-base mb-4 px-8">
              located in the {country.continents}, in the subregion {}
              {country.subregion}
            </p>
            <button
              type="button"
              className=" inline-block px-6 py-2.5 text-sm bg-none border border-sky-500 text-sky-500 hover:text-white font-medium leading-tight uppercase rounded shadow-md hover:bg-sky-600"
            >
              Ver
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
