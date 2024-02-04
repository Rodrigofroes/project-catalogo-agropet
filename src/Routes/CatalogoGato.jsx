import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Input from "../components/Input.jsx";
import Card from "../components/Card.jsx";
import { GlobalListContext } from "../context/listContext.jsx";
import Loading from "../components/Loading.jsx";
import Footer from "../components/Footer.jsx";

const CatalogoCachorro = () => {
  const { addToList } = useContext(GlobalListContext);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [catalogo, setCatalogo] = useState([]);
  const [pesquisa, setPesquisa] = useState("");

  useEffect(() => {
    setTimeout(() => {
      axios.get("https://agropet-site-default-rtdb.firebaseio.com/gato.json")
      .then((resp) => {
        const data = resp.data;
        let responseData;
        if (Array.isArray(data)) {
          responseData = data;
        } else {
          responseData = Object.entries(data).map(([key, value]) => {
            try {
              return JSON.parse(value);
            } catch (e) {
              console.error(`Error parsing JSON for key ${key}:`, e);
              return null;
            }
          }).filter(item => item !== null); 
        }
        setCatalogo(responseData);
        setRemoveLoading(true);
      })
      .catch((err) => console.error(err));
    }, 2000);
  }, []);

  const filteredCatalogo = pesquisa
    ? catalogo.filter((item) =>
        item.nome.toLowerCase().includes(pesquisa.toLowerCase())
      )
    : catalogo;

  return (
    <>
      <div className="h-full flex justify-center gap-4">
        <Input msg="Pesquisar" search={pesquisa} setSearch={setPesquisa} />
      </div>
      <div className="flex flex-wrap justify-center">
        {Array.isArray(filteredCatalogo) && filteredCatalogo.map((item) => (
          <div key={item.id} className="m-2">
            <Card
              marca={item.marca}
              nome={item.nome}
              imagem={item.imgURL}
              tipo={item.tipo}
            >
              <div className="flex mt-4 gap-4 flex-col items-center justify-center">
                <p>Tamanhos disponíveis:</p>
                <div className="flex gap-2">
                  {Array.isArray(item.pacotes) && item.pacotes.map((pacote) => (
                    <ul key={pacote.id} className="flex flex-col items-center justify-center bg-blue-500 p-1 text-sm font-medium text-white rounded-md">
                      <li>{pacote.pacote + "kg"}</li>
                      <li>
                        {pacote.preco.toLocaleString("pt-br", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </li>
                    </ul>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        ))}
        {!removeLoading && <Loading />}
      </div>
    </>
  );
};

export default CatalogoCachorro;
