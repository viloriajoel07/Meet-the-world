import { faArrowUp, faFlagUsa } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function FloatButton({ handleModal }) {
  return (
    <>
      <button
        className="bg-slate-800 w-12 h-12 rounded-full fixed bottom-0 right-0 mb-20 mr-6 flex justify-center items-center hover:scale-110 transition-all cursor-pointer "
        onClick={handleModal}
      >
        <span className="text-white font-extrabold rotate-12">
          <FontAwesomeIcon icon={faFlagUsa} />
        </span>
      </button>
      <a
        href="#anchor"
        className="bg-slate-800 w-12 h-12 rounded-full fixed bottom-0 right-0 mb-6 mr-6 flex justify-center items-center hover:scale-110 transition-all cursor-pointer "
      >
        <span className="text-white font-extrabold">
          <FontAwesomeIcon icon={faArrowUp} />
        </span>
      </a>
    </>
  );
}
