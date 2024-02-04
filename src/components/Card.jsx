import React from "react";

const Card = ({ marca, nome, tipo, imagem, alt, children }) => {
  return (
    <div className="mt-5 flex flex-col items-center justify-center shadow-lg p-6 rounded-xl max-w-xs">
      <div className="flex flex-col items-center text-center">
        <h2 className="font-medium">{marca}</h2>
        <img loading="lazy" className="w-36 h-36 mt-4" src={imagem} alt={alt} />
        <h3 className="mt-4 flex items-center justify-center font-semibold break-words">{nome}</h3>
      </div>
      <div>
        <h2 className="mt-5 bg-green-500 p-1 flex justify-center rounded-sm text-white font-semibold">{tipo}</h2>
      </div>
      {children}
    </div>
  );
};

export default Card;
