import React, { useContext, useState} from "react";
import { GlobalListContext } from "../context/listContext.jsx";
import Card from "../components/Card.jsx";
import Loading from "../components/Loading.jsx";
import CardCompra from "../components/CardCompra.jsx";

const CarrinhoCompra = () => {
  const [select, setSelect] = useState();
  const { lista } = useContext(GlobalListContext);

  const pegaValor = (valor) => {
    setSelect(valor);
    console.log(valor);
  };

  return (
    <div>
      <h1>Carrinho de Compras</h1>
      {lista.map((item) => (
        <div key={item.id}>
          <CardCompra marca={item.marca} imagem={item.imgURL} nome={item.nome}>
            <select value={select} className="bg-zinc-300 px-3 py-1 rounded-md">
              {item.pacotes.map((pacote) => (
                <>
                  <option
                    onChange={console.log(pacote.pacote)}
                    value={pacote.pacote}
                  >
                    {pacote.pacote} -{" "}
                    {pacote.preco.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </option>
                </>
              ))}
            </select>
          </CardCompra>
        </div>
      ))}
    </div>
  );
};

export default CarrinhoCompra;
