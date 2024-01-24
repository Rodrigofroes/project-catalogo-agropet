import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// 1  - configurando Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CatalogoCachorro from './Routes/CatalogoCachorro.jsx'
import CatalogoGato from './Routes/CatalogoGato.jsx'
import CarrinhoCompra from './Routes/CarrinhoCompra.jsx'
import CadastroProduto from './Routes/CadastroProduto.jsx'
import Tabela from './Routes/Tabela.jsx' 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        path: "/",
        element: <CatalogoCachorro/>
      },
      {
        path: "gato",
        element: <CatalogoGato/>
      },
      {
        path: "carrinho",
        element: <CarrinhoCompra/>
      },
      {
        path: "cadastro",
        element: <CadastroProduto/>
      },
      {
        path: "tabelaProdutos",
        element: <Tabela/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
