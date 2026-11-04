import { intencoes } from "../dados.js";
import { Icone } from "./Icones.jsx";

export default function Intencao({ onEscolher }) {
  return (
    <section className="intencao" aria-labelledby="intencao-titulo">
      <h2 id="intencao-titulo" className="intencao__titulo">O que te traz aqui hoje?</h2>
      <ul className="intencao__lista">
        {intencoes.map((it) => (
          <li key={it.consulta}>
            <a href={`#c-${it.consulta}`} className="intencao__item" onClick={(e) => { e.preventDefault(); onEscolher(it.consulta); }}>
              <Icone id={it.icone} />
              <span><strong>{it.titulo}</strong>{it.frase}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
