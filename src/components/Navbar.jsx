import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../assets/logo/logo-agropet.e88addfc.png";
import { TfiMenu, TfiBag  } from "react-icons/tfi";
import { GlobalListContext } from '../context/listContext.jsx';
import React, { useContext } from "react";

const Navbar = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const { conutList } = useContext(GlobalListContext);

    useEffect(() => {
      const btn = document.getElementById("menuButton");
      const menu = document.getElementById("menu");
  
      if (btn) {
        btn.addEventListener("click", () => {
          setMenuVisible(!menuVisible);
        });
      }
  
      return () => {
        if (btn) {
          btn.removeEventListener("click", () => {
            setMenuVisible(!menuVisible);
          });
        }
      };
    }, [menuVisible]);


  return (
    <>
      <nav>
        <div className="max-w-7xl mx-auto p-4 sm:px6 lg:px8">
            <div className="flex items-center justify-around h-16">
                <div className="flex items-center">
                    <figure className="flex-shrink-0">
                        <img className="w-16 rounded-lg" src={Logo} alt="Agropet - Logo marca" />
                    </figure>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4 *:font-medium  ">
                            <Link className="transition hover:text-zinc-100 hover:bg-green-600 px-3 py-2 rounded-md" to="/">Home</Link>
                            <Link className="transition hover:text-zinc-100 hover:bg-green-600 px-3 py-2 rounded-md" to="cachorro">Cachorro</Link>
                            <Link className="transition hover:text-zinc-100 hover:bg-green-600 px-3 py-2 rounded-md" to="gato">Gato</Link>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                      <Link to="carrinho">
                        <TfiBag/>
                      </Link>
                      <div className="bg-green-500 p-1 rounded-full text-white font-medium px-2 py-1">
                        {conutList()}
                      </div>
                    </div>
                  </div>
                <div className="-mr-2 flex md:hidden">
                    <button id="menuButton" type="button" className="inline-flex items-center justify-center p-2 rounded-md hover:text-zinc-100 hover:bg-green-600 focus:outline-none focus:bg-green-600 focus:text-zinc-100 transition" aria-label="Menu" aria-expanded={menuVisible}>
                        <TfiMenu />
                    </button>
                </div>
            </div>
        </div>
        <div id="menu" className={`${menuVisible ? "block" : "hidden"} transition md:hidden px-2 pt-2 pd-3 sm:px-3 *:font-medium`}>
            <div>
                <Link className="transition hover:text-zinc-100 hover:bg-green-600 px-3 py-2 rounded-md block text-base" to="/">Home</Link>
                <Link className="transition hover:text-zinc-100 hover:bg-green-600 px-3 py-2 rounded-md block text-base" to="cachorro">Cachorro</Link>
                <Link className="transition hover:text-zinc-100 hover:bg-green-600 px-3 py-2 rounded-md block text-base" to="gato">Gato</Link>
            </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
