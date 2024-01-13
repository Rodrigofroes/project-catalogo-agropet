import React from "react";

const Card = ({ marca, nome, tipo, imagem, alt, children }) => {
  return (
    <div  className="mt-5 flex flex-col items-center justify-center shadow-lg w-64 p-6 rounded-xl">
      <div className="flex flex-col items-center">
        <h2 className="font-medium">{marca}</h2>
        <img  loading="lazy" className="w-44 mt-4" src={imagem} alt={alt}/>
        <h3 className="mt-4 w-56 items-center flex justify-center font-semibold text-justify">{nome}</h3>
      </div>
      <div>
        <h2 className=" mt-5 bg-green-500 p-1 flex justify-center rounded-sm text-white font-semibold">{tipo}</h2>
      </div>
      {children}
    </div>
  );
};

export default Card;
