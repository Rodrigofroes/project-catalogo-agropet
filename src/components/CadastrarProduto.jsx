import React from "react";
import { Controller } from "react-hook-form";

const CadastrarProduto = ({ titulo, processPercent,imgUrl, errors, handleSubmit, register, control, fields, addSizePackage, handleImageChange, onSubmit }) => {
  return (
    <div>
      <h1>{titulo}</h1>
      <div className="h-screen flex items-center justify-center">
        <div className=" flex flex-col justify-center items-center max-w-sm">
          <div className="flex gap-32">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 min-h-[500px]"
            >
              <h1 className="font-medium text-2xl flex items-center justify-center mb-10">
                Cadastro de Produto
              </h1>
              <Controller
                  name="categoria"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <select
                      {...register("categoria")}
                      {...field}
                      id="categoria"
                      className="bg-slate-200 outline-none  px-1 py-2 rounded-md"
                    >
                      <option value="cachorro">
                        Cachorro
                      </option>
                      <option value="gato">Gato</option>
                    </select>
                  )}
                />
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
                      <option value="Alimento Completo">
                        Alimento Completo
                      </option>
                      <option value="Premium">Premium</option>
                      <option value="Super Premium">Super Premium</option>
                    </select>
                  )}
                />
                {errors.tipo && (
                  <span className="text-red-500">
                    Este campo é obrigatório.
                  </span>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastrarProduto;
