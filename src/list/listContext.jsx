import React, { createContext, useContext, useState } from "react";

const ListContext = createContext();

export const ListProvider = ({ children }) => {
  const [listaGlobal] = useState([]);

  return (
    <ListContext.Provider value={{ listaGlobal }}>
      {children}
    </ListContext.Provider>
  );
};

export const useList = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error("useList deve ser usado dentro de um ListProvider");
  }
  return context;
};
