import React from "react";

const Card = ({ country, id, handleModal, search }) => {
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

  return (
    <a id={id} onClick={(e) => handleModal(id)}>
      <div className="block rounded-lg bg-white shadow-2xl gray-person w-full sm:w-96 text-center mb-4 sm:m-4 cursor-pointer hover:scale-105 transition-all z-10">
        <div className="p-4 sm:p-6">
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
        </div>
      </div>
    </a>
  );
};

export default Card;
