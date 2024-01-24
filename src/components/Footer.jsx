import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className='bg-green-500 mt-10 p-4'>
        <div className="container mx-auto flex flex-wrap justify-around items-center">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="font-bold text-xl mb-2">Endereço da Loja</h3>
            <p>Rua Barão do Rio Branco, 56, Centro, Álvares Machado</p>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="font-bold text-xl mb-2">Siga-nos</h3>
            <div className="flex items-center">
              {/* Substitua os links pelos da sua loja */}
              <a href="https://facebook.com/" className="mr-4">
                Facebook
              </a>
              <a href="https://www.instagram.com/agropetbd/" className="mr-4">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
