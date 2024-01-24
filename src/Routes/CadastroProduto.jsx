import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { getDatabase, push, ref as databaseRef } from "firebase/database";
import { initializeApp } from "firebase/app";

import firebaseConfig from "../firebase/firebaseConfig";
import ExcluirProduto from "../components/ExcluirProduto";

initializeApp(firebaseConfig);

const saveUserData = (dados, tipoCategoria) => {
  const db = getDatabase();
  const categoria = tipoCategoria.toLowerCase();
  console.log(categoria)
  const usersRef = databaseRef(db, `${categoria}/`);
  push(usersRef, dados)
  alert("Produto cadastrado com sucesso!");
};

const createUserFromSchema = z.object({
  nome: z.string().min(1, "Este campo é obrigatório."),
  marca: z.string().min(1, "Este campo é obrigatório."),
  tipo: z.string().min(1, "Este campo é obrigatório."),
  pacotes: z.array(
    z.object({
      pacote: z.coerce.number().min(1, "Informe o tamanho do pacote"),
      preco: z.coerce.number().min(1, "Informe um valor"),
    })
  ),
});

const CadastroProduto = () => {
  const [imgUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [processPercent, setProcessPercent] = useState(0);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createUserFromSchema),
  });

  const [valor, setValor] = useState("");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pacotes",
  });

  function addSizePackage() {
    append({ pacote: "", preco: 0 });
  }

  const onSubmit = async (data) => {
    if (selectedFile) {
      const imageUrl = await uploadImage(selectedFile);
      data.imgURL = imageUrl;
    } else {
      delete data.imgURL;
    }

    const tipoCategoria = document.getElementById("tipoCategoria").value;

    const dadosDoProduto = {
      nome: data.nome,
      marca: data.marca,
      tipo: data.tipo,
      pacotes: data.pacotes,
      imgURL: data.imgURL,
    };

    saveUserData(JSON.stringify(dadosDoProduto, null, 2), tipoCategoria);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const uploadImage = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProcessPercent(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className=" flex flex-col justify-center items-center max-w-sm">
        <div className="flex gap-32">
          <form onSubmit={handleSubmit(onSubmit)} 
            className="space-y-5 min-h-[500px]">
            <h1 className="font-medium text-2xl flex items-center justify-center mb-10">
              Cadastro de Produto
            </h1>
            <div className="flex flex-col">
              <label className="font-medium mb-2" htmlFor="selectCategoria">
                Categoria:
              </label>
              <select
                id="tipoCategoria"
                className="bg-slate-200 outline-none  px-1 py-2 rounded-md"
              >
                <option value="cachorro">Cachorro</option>
                <option value="gato">Gato</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-2" htmlFor="nomeproduto">
                Nome do Produto:
              </label>
              <input
                type="text"
                id="nomeproduto"
                placeholder="Digite o nome do produto"
                {...register("nome")}
                className="bg-slate-200 outline-none ring-2 ring-gray-400 px-1 py-2 rounded-md"
              />
              {errors.nome && (
                <span className="text-red-500">{errors.nome.message}</span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-2" htmlFor="marcaproduto">
                Marca do Produto:
              </label>
              <input
                type="text"
                id="marcaproduto"
                placeholder="Digite a marca do produto"
                {...register("marca")}
                className="bg-slate-200 outline-none ring-2 ring-gray-400 px-1 py-2 rounded-md"
              />
              {errors.marca && (
                <span className="text-red-500">{errors.marca.message}</span>
              )}
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-2" htmlFor="opcao">
                Tipo do Produto:
              </label>
              <Controller
                name="tipo"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <select
                    {...register("tipo")}
                    {...field}
                    id="opcao"
                    className="bg-slate-200 outline-none  px-1 py-2 rounded-md"
                  >
                    <option value="">Selecio um tipo</option>
                    <option value="Alimento Completo">Alimento Completo</option>
                    <option value="Premium">Premium</option>
                    <option value="Super Premium">Super Premium</option>
                  </select>
                )}
              />
              {errors.tipo && (
                <span className="text-red-500">Este campo é obrigatório.</span>
              )}
            </div>
            <div className="flex flex-col">
              <label
                className="font-medium mb-2 flex items-center justify-between"
                htmlFor=""
              >
                Tamanho do pacote
                <button
                  type="button"
                  onClick={addSizePackage}
                  className="text-green-500 text-xs"
                >
                  Adicionar
                </button>
              </label>
              {fields.map((field, index) => {
                return (
                  <div
                    key={field.id}
                    className="flex items-center justify-center gap-2"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="">
                        <input
                          type="text"
                          {...register(`pacotes.${index}.pacote`)}
                          className="bg-slate-200 flex-1 outline-none ring-2 ring-gray-400 px-1 py-2 rounded-md"
                        />
                        {errors.pacotes?.[index]?.pacote && (
                          <span className="text-red-500">
                            Campo é obrigatório.
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2 flex-col">
                        <input
                          type="text"
                          min="0"
                          {...register(`pacotes.${index}.preco`)}
                          className="bg-slate-200 w-20 outline-none ring-2 ring-gray-400 px-1 py-2 rounded-md"
                        />
                        {errors.pacotes?.[index]?.pacote && (
                          <span className="text-red-500">
                            Campo é obrigatório.
                          </span>
                        )}
                      </div>
                      <button type="button" onClick={() => remove(index)}>
                        Remover
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col">
              <label className="font-medium mb-2" htmlFor="">
                Foto do Produto:
              </label>
              <input
                type="file"
                id="imagemProduto"
                onChange={handleImageChange}
              />
            </div>
            {!imgUrl && (
              <div className="outerbar">
                <div
                  className="innerbar"
                  style={{ width: `${processPercent}%` }}
                >
                  {processPercent}%
                </div>
              </div>
            )}
            <button
              type="submit"
              className="bg-green-600 w-full items-center justify-center p-2 rounded-md mt-5 text-white font-medium"
            >
              Cadastrar
            </button>
          </form>
          <ExcluirProduto />
        </div>
      </div>
    </div>
  );
};

export default CadastroProduto;
