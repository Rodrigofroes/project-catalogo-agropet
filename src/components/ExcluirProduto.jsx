import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { getDatabase, ref, remove } from "firebase/database";
import { initializeApp } from "firebase/app";

import firebaseConfig from "../firebase/firebaseConfig";

initializeApp(firebaseConfig);

const deleteUserData = (id) => {
  const db = getDatabase();
  remove(ref(db, "cachorro/" + id));
  alert("Produto excluido com sucesso!");
};

const createManipularProduto = z.object({
  id: z.string().min(1, "Este campo é obrigatório."),
});

const ExcluirProduto = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createManipularProduto),
  });

  const createID = (data) => {
    deleteUserData(data.id);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(createID)}>
        <h1 className="font-medium text-2xl flex items-center justify-center mb-10">
          Excluir Produto
        </h1>
        <div>
          <div>
            <label htmlFor="" className="font-medium">
              ID do produto:
            </label>
            <input
              type="text"
              {...register("id")}
              className="bg-slate-200 mt-2 outline-none ring-2 ring-gray-400 px-1 py-2 rounded-md"
            />
            {errors.id && (
              <span className="text-red-500">Este campo é obrigatório.</span>
            )}
          </div>
          <button
            type="submit"
            className="bg-red-600 w-full items-center justify-center p-2 rounded-md mt-5 text-white font-medium"
          >
            Excluir
          </button>
        </div>
      </form>
      <div className="mt-4">
        <Link
          to="/tabelaProdutos"
          target="_blank"
          className="hover:underline text-blue-500 font-medium"
          >
          Tabela de Produtos
        </Link>
      </div>
    </div>
  );
};

export default ExcluirProduto;
