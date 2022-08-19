import { useState } from "react";

export const useModal = (initialState = {}) => {
  const [modalState, setModalState] = useState(initialState);
  const [index, setIndex] = useState(0);

  const activeModal = (id) => {
    setIndex(id);
    setModalState({ showModal: true, classBlur: true });
  };

  const hiddenModal = () => {
    setModalState(initialState);
  };

  const changeCountry = (option) => {
    if (option == 1) {
      setIndex(index + 1);
    } else {
      setIndex(index - 1);
    }
  };

  return {
    ...modalState,
    activeModal,
    hiddenModal,
    changeCountry,
    index,
    modalState,
  };
};
