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
   
  );
};

export default ExcluirProduto;