import { key } from 'localforage';
import React, { createContext, useEffect, useState } from 'react';

export const GlobalListContext = createContext();

export const GlobalListProvider = ({ children }) => {
  const [lista] = useState([]);
  const [count, setCount] = useState(0);

  const addToList = (item) => {
    //caso ja contenha o item na lista, nao adiciona
    if (lista.some((i) => i.id === item.id)) return false;
    lista.push(item);
    console.log(lista);
    return true;
  };

  //verificar quantos itens tem na lista usendo useState
  const conutList = () => {
    return setCount(lista.length);
  };

  const removeFromList = (id) => {
    const newList = lista.filter((item) => item.id !== id);
    setLista(newList);
  };

  const clearList = () => {
    setLista([]);
  };

  return (
    <GlobalListContext.Provider
      value={{
        lista,
        conutList,
        addToList,
        removeFromList,
        clearList,
      }}
    >
      {children}
    </GlobalListContext.Provider>
  );
};
