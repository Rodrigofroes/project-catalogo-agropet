import { useContext, useState } from "react";

function CardCompra({ children, nome, marca, imagem, alt }) {


  return (
    <div>
      <div className=" h-screen flex flex-col items-center justify-center shadow-lg w-64 p-6 rounded-xl">
        <div className="flex flex-col items-center">
          <h2 className="font-medium">{marca}</h2>
          <img loading="lazy" className="w-44 mt-4" src={imagem} alt={alt} />
          <h3 className="mt-4 w-56 items-center flex justify-center font-semibold text-justify">
            {nome}
          </h3>
        </div>
        {children}
      </div>
    </div>
  );
}

export default CardCompra;
