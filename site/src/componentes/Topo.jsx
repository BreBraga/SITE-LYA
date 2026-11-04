import { useEffect, useState } from "react";
import { MENSAGEM_GERAL, linkWhats } from "../dados.js";
import { Icone } from "./Icones.jsx";

export function Marca() {
  return (
    <a className="marca" href="#inicio" aria-label="Lya Cartomante, início">
      <span className="marca__nome">Lya</span>
      <span className="marca__oficio">cartomante</span>
    </a>
  );
}

export default function Topo() {
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 40);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <header className={`topo${rolou ? " topo--rolou" : ""}`}>
      <Marca />
      <nav className="topo__nav" aria-label="Seções">
        <a href="#promocoes">Promoções</a>
        <a href="#consultas">Consultas</a>
        <a href="#como-funciona">Como funciona</a>
        <a href="#duvidas">Dúvidas</a>
      </nav>
      <a className="botao botao--fino" href={linkWhats(MENSAGEM_GERAL)} target="_blank" rel="noopener">
        <Icone id="conversa" /> Agendar
      </a>
    </header>
  );
}
