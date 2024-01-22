import Input from "../components/Input.jsx";
import Filtro from "../components/Filtro.jsx";
import Card from "../components/Card.jsx";
import Loading from "../components/Loading.jsx";
import { IoMdAdd } from "react-icons/io";
import React, { useState, useEffect, useContext } from "react";
import { GlobalListContext } from '../context/listContext.jsx';
import axios from 'axios';

const CatalogoGato = () => {
  const { addToList } = useContext(GlobalListContext);
  const [catalogo, setCatalogo] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
 
  const ColetaDados = (item) => {
   return addToList(item);
  }

  useEffect(() => {
    setTimeout(() => {
      axios.get("https://agropet-site-default-rtdb.firebaseio.com/gato.json")
      .then((resp) => {
        setCatalogo(resp.data);
        setRemoveLoading(true);
      }
      )
      .catch((err) => console.log(err));
    }, 2000);
  }, []);

  return (
    <>
      <div className="flex items-center justify-center gap-4 max-lg:flex max-lg:items-center max-lg:justify-center max-lg:gap-2">
        <Input msg="Pesquisar" />
        {/* <Filtro /> */}
      </div>
      <div className="flex flex-wrap justify-center">
        {catalogo.map((item) => (
          <>
            <div key={item.id}>
              <Card
                marca={item.marca}
                nome={item.nome}
                imagem={item.imgURL}
                tipo={item.tipo}
              >
              <div className="flex gap-4 mt-4 flex-col items-center justify-center">
                <p>Tamanhos disponiveis</p>
                <div className="flex gap-2">
                  {item.pacotes.map((pacotes) => (
                    <div key={pacotes.id} className="">
                      <ul className="flex flex-col items-center justify-center bg-blue-500 p-1 *:text-sm font-medium text-white rounded-md">
                        <li>{pacotes.pacote}</li>
                        <li>{pacotes.preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              </Card>
            </div>
          </>
        ))}
        {!removeLoading && <Loading />}
      </div>
    </>
  );
};

export default CatalogoGato;
