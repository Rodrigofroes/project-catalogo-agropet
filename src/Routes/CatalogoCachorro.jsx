import Input from "../components/Input.jsx";
import Filtro from "../components/Filtro.jsx";
import Card from "../components/Card.jsx";
import { IoMdAdd } from "react-icons/io";
import React, { useState, useEffect, useContext } from "react";
import { GlobalListContext } from "../context/listContext.jsx";
import Loading from "../components/Loading.jsx";

const CatalogoCachorro = () => {
  const { addToList } = useContext(GlobalListContext);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [catalogo, setCatalogo] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  const ColetaDados = (item) => {
    return addToList(item);
  };




  useEffect(() => {
    setTimeout(() => {
      fetch("http://192.168.200.146:8000/cachorro", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setCatalogo(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 2000);
  }, []);

  return (
    <>
      <div className="flex items-center justify-center gap-4 max-lg:flex max-lg:items-center max-lg:justify-center max-lg:gap-2">
        <Input msg="Pesquisar" search={pesquisa} setSearch={setPesquisa}/>
        <Filtro />
      </div>
      <div className="flex items-center justify-center flex-col">
        {catalogo.filter((item) => item.nome.toLowerCase().includes(pesquisa.toLowerCase())).map((item) => (
          <>
            <div key={item.id}>
              <Card
                marca={item.marca}
                nome={item.nome}
                imagem={item.imgURL}
                tipo={item.tipo}
              >
                <button
                  className="flex text-white font-medium rounded-full justify-center items-center mt-5 w-full bg-blue-500 p-3"
                  id={item.id}
                  onClick={() => ColetaDados(item)}
                >
                  Adicionar ao carrinho
                </button>
              </Card>
            </div>
          </>
        ))}
        {!removeLoading && <Loading />}
      </div>
    </>
  );
};

export default CatalogoCachorro;
