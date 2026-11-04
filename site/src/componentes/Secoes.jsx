import { depoimentos, duvidas, INSTAGRAM, linkWhats, MENSAGEM_GERAL, passos } from "../dados.js";
import { Icone } from "./Icones.jsx";
import { Marca } from "./Topo.jsx";

const ROMANOS = ["I", "II", "III", "IV"];

export function ComoFunciona() {
  return (
    <section className="como" id="como-funciona" aria-labelledby="como-titulo">
      <h2 id="como-titulo" className="titulo-secao">Como funciona</h2>
      <ol className="passos">
        {passos.map((p, i) => (
          <li className="passo" key={p.titulo}>
            <span className="passo__num">{ROMANOS[i]}</span>
            <h3>{p.titulo}</h3>
            <p>{p.texto}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Depoimentos() {
  return (
    <section className="vozes" aria-labelledby="vozes-titulo">
      <h2 id="vozes-titulo" className="titulo-secao">Quem já <span className="script">consultou</span></h2>
      <div className="vozes__grade">
        {depoimentos.map((d, i) => (
          <figure className="voz" key={i}>
            <blockquote>“{d.texto}”</blockquote>
            <figcaption>{d.autora} · {d.consulta}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function Sobre() {
  return (
    <section className="sobre" aria-labelledby="sobre-titulo">
      <div className="sobre__arco" aria-hidden="true">
        {/* Trocar por foto da Lya: coloque o arquivo em site/public/lya.jpg e use <img src="/lya.jpg" alt="" /> */}
        <Icone id="lua" className="sobre__lua" />
      </div>
      <div className="sobre__texto">
        <p className="rotulo">Quem lê as suas cartas</p>
        <h2 id="sobre-titulo" className="titulo-secao">Eu sou a <span className="script">Lya</span></h2>
        <p>Trabalho com tarot e baralho cigano para ajudar você a enxergar com mais nitidez o momento que está vivendo. A leitura não decide por você: ela mostra caminhos, tendências e pontos de atenção para que você escolha com mais consciência.</p>
        <p>Cada consulta é feita no dia agendado, com tempo e cuidado, e enviada em áudio para você ouvir quantas vezes precisar.</p>
      </div>
    </section>
  );
}

export function Duvidas() {
  return (
    <section className="duvidas" id="duvidas" aria-labelledby="duvidas-titulo">
      <h2 id="duvidas-titulo" className="titulo-secao">Dúvidas frequentes</h2>
      <div className="duvidas__lista">
        {duvidas.map((d) => (
          <details key={d.pergunta}>
            <summary>{d.pergunta}</summary>
            <p>{d.resposta}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ChamadaFinal() {
  return (
    <section className="final">
      <Icone id="lua" className="final__lua" />
      <h2 className="final__titulo">As cartas estão na <span className="script">mesa</span></h2>
      <p>Mande uma mensagem e agende a sua leitura.</p>
      <a className="botao botao--vela" href={linkWhats(MENSAGEM_GERAL)} target="_blank" rel="noopener">
        <Icone id="conversa" /> Agendar pelo WhatsApp
      </a>
    </section>
  );
}

export function Rodape() {
  return (
    <footer className="rodape">
      <Marca />
      <p>Leituras entregues no dia agendado.</p>
      <nav className="rodape__links" aria-label="Redes">
        <a href={INSTAGRAM} target="_blank" rel="noopener">Instagram</a>
        <a href={linkWhats("Olá, Lya!")} target="_blank" rel="noopener">WhatsApp</a>
      </nav>
      <p className="rodape__mini">© {new Date().getFullYear()} Lya Cartomante</p>
    </footer>
  );
}

export function BotaoFlutuante() {
  return (
    <a className="flutuante" href={linkWhats(MENSAGEM_GERAL)} target="_blank" rel="noopener" aria-label="Agendar pelo WhatsApp">
      <Icone id="conversa" />
    </a>
  );
}
