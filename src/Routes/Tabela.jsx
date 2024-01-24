import React, { useState, useEffect } from "react";

function Tabela() {
  const [dados, setDados] = useState([]);
  const[dadosCato, setDadosCato] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const resposta = await fetch("https://agropet-site-default-rtdb.firebaseio.com/cachorro.json");
      const dadosObj = await resposta.json();
  
      // Converter as strings JSON em objetos JavaScript
      const dadosArray = Object.entries(dadosObj).map(([id, jsonStr]) => {
        try {
          const info = JSON.parse(jsonStr);
          return { id, ...info };
        } catch (error) {
          console.error(`Erro ao analisar o JSON para o ID ${id}:`, error);
          return { id };
        }
      });
  
      setDados(dadosArray);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const respostgato = await fetch("https://agropet-site-default-rtdb.firebaseio.com/gato.json");
      const dadosOBJ = await respostgato.json();
  
      // Converter as strings JSON em objetos JavaScript
      const dadosArrayGato = Object.entries(dadosOBJ).map(([id, jsonStr]) => {
        try {
          const info = JSON.parse(jsonStr);
          return { id, ...info };
        } catch (error) {
          console.error(`Erro ao analisar o JSON para o ID ${id}:`, error);
          return { id };
        }
      });
  
      setDadosCato(dadosArrayGato);
    }
    fetchData();
  }, []);

  return (
    <div className="h-full flex justify-center gap-4">
      <div className="flex flex-wrap justify-center">
        <div className="m-4">
            <div>
                <h1>Cachorro</h1>
            </div>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="bg-gray-200 p-2">ID</th>
                <th className="bg-gray-200 p-2">Nome</th>
                <th className="bg-gray-200 p-2">Marca</th>
                <th className="bg-gray-200 p-2">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {dados.map((item) => (
                <tr key={item.id}>
                  <td className="p-2">{item.id}</td>
                  <td className="p-2">{item.nome}</td>
                  <td className="p-2">{item.marca}</td>
                  <td className="p-2">{item.tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="m-4">
            <div>
                <h1>Gato</h1>
            </div>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="bg-gray-200 p-2">ID</th>
                <th className="bg-gray-200 p-2">Nome</th>
                <th className="bg-gray-200 p-2">Marca</th>
                <th className="bg-gray-200 p-2">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {dadosCato.map((item) => (
                <tr key={item.id}>
                  <td className="p-2">{item.id}</td>
                  <td className="p-2">{item.nome}</td>
                  <td className="p-2">{item.marca}</td>
                  <td className="p-2">{item.tipo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  
}

export default Tabela;
