import Input from "../components/Input.jsx";
import Filtro from "../components/Filtro.jsx";
import Card from "../components/Card.jsx";
import { IoMdAdd } from "react-icons/io";
import React, { useState, useEffect, useContext } from "react";
import { GlobalListContext } from "../context/listContext.jsx";
import Loading from "../components/Loading.jsx";
import Alert from "@mui/material/Alert";
import AlertNotification from "../components/Alert.jsx";
import Footer from "../components/Footer.jsx";
import  axios  from "axios";

const CatalogoCachorro = () => {
  const { addToList } = useContext(GlobalListContext);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [catalogo, setCatalogo] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  // const ColetaDados = (item) => {
  //   return addToList(item);
  // };

  useEffect(() => {
    setTimeout(() => {
      axios.get("https://agropet-site-default-rtdb.firebaseio.com/cachorro.json")
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
      <div className="h-full flex justify-center gap-4">
        <Input msg="Pesquisar" search={pesquisa} setSearch={setPesquisa} />
        {/* <Filtro /> */}
      </div>
      <div className="flex flex-wrap justify-center">
        {catalogo
          .filter((item) =>
            item.nome.toLowerCase().includes(pesquisa.toLowerCase())
          )
          .map((item) => (
            <>
              <div key={item.id}>
                <Card
                  marca={item.marca}
                  nome={item.nome}
                  imagem={item.imgURL}
                  tipo={item.tipo}
                >
                  <div className="flex mt-4 gap-4 flex-col items-center justify-center">
                    <p>Tamanhos disponiveis:</p>
                    <div className="flex gap-2">
                      {item.pacotes.map((pacotes) => (
                        <div key={pacotes.id} className="">
                          <ul className="flex flex-col items-center justify-center bg-blue-500 p-1 *:text-sm font-medium text-white rounded-md">
                            <li>{pacotes.pacote}</li>
                            <li>
                              {pacotes.preco.toLocaleString("pt-br", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </li>
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

export default CatalogoCachorro;
