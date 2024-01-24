import React, { useEffect } from "react";
import "./App.css";

import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { GlobalListProvider } from './context/listContext.jsx';

function App() {

  return (
    <GlobalListProvider>
      <Navbar />
      <Outlet />
    </GlobalListProvider>
  );
}

export default App;
