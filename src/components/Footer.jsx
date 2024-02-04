import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div>
      <footer className="bg-green-500 p-4">
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-around">
          <div className="flex flex-col gap-2 justify-center items-center md:mr-8">
            <h1 className="font-medium text-xl">Saiba onde nos encontrar</h1>
            <iframe
              className="rounded-lg md:rounded-none md:rounded-r-lg"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d924.3447161719765!2d-51.476697445660676!3d-22.073343602648897!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9493f193fa7a7175%3A0xd432ec947125f7bc!2sCl%C3%ADnica%20Veterin%C3%A1ria%20Dra%20Bianca%20Carlini!5e0!3m2!1spt-BR!2sbr!4v1706863803969!5m2!1spt-BR!2sbr"
              width="200"
              height="200"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="flex flex-col space-y-4 text-center md:text-left">
            <div>
              <h1 className="font-medium text-xl">Redes Sociais</h1>
              <div className="flex gap-4 mt-2">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xl"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xl"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-medium">Contato</h1>
              <p>Telefone: (18) 99686-7511</p>
            </div>
            <div>
              <h1 className="text-xl font-medium">Endereço</h1>
              <p>Rua Barão do Rio Branco, 56 - Álvares Machado</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
