import React, { useContext, useState } from 'react'
import { GlobalListContext } from '../context/listContext.jsx';
import Card from '../components/Card.jsx';
import Loading from '../components/Loading.jsx';

const CarrinhoCompra = () => {
  const[select, setSelect] = useState();
  const { lista } = useContext(GlobalListContext);

  const pegaValor = (valor) => {
    setSelect(valor)
    console.log(valor);
  }
  
  return (
    <div>
      <h1>Carrinho de Compras</h1>
      {lista.map((item) => (
        <div key={item.id}>
          <Card 
          marca={item.marca}
          imagem={item.imgURL}
          nome={item.nome}
          tipo={item.tipo}
          />
          <select value={select}  >
            {item.pacotes.map((pacote) => (
              <option onChange={console.log(pacote.pacote)} value={pacote.pacote}>{pacote.pacote}-{pacote.preco}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  )
}

export default CarrinhoCompra