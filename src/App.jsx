import React from "react";
import "./App.css";
import Footer from "./components/Footer.jsx";

// 2- Reaproveitamento de estrura
import { Outlet } from "react-router-dom";

// 3- Navegando entre paginas
import Navbar from "./components/Navbar";

import { GlobalListProvider } from './context/listContext.jsx';
import CatalogoCachorro from './Routes/CatalogoCachorro.jsx';
function App() {
  return (
    <GlobalListProvider>
      <Navbar />
      <Outlet />
    </GlobalListProvider>
  );
}

export default App;
