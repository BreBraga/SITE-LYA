import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { linkWhats, promocaoDoMes as pm, promocoes } from "../dados.js";
import { Icone, Verso } from "./Icones.jsx";

function textoPrazo(fimISO) {
  const fim = new Date(fimISO + "T23:59:59");
  const dias = Math.ceil((fim - new Date()) / 86400000);
  const data = fim.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  if (dias < 0) return "Promoção encerrada";
  if (dias <= 1) return `Último dia · até ${data}`;
  if (dias <= 10) return `Faltam ${dias} dias · até ${data}`;
  return `Válida até ${data}`;
}

function CartaDoMes() {
  const ref = useRef(null);
  const reduzido = useReducedMotion();
  const visivel = useInView(ref, { once: true, amount: 0.6 });
  const [virada, setVirada] = useState(false);

  useEffect(() => {
    if (reduzido) return setVirada(true);
    if (!visivel) return;
    const t = setTimeout(() => setVirada(true), 500);
    return () => clearTimeout(t);
  }, [visivel, reduzido]);

  return (
    <button
      ref={ref}
      type="button"
      className={`carta-mes${virada ? " virada" : ""}`}
      aria-pressed={virada}
      aria-label={virada ? `Promoção de ${pm.mes}: ${pm.nome} por R$ ${pm.preco}` : "Revelar a promoção do mês"}
      onClick={() => setVirada((v) => !v)}
    >
      <span className="carta-mes__giro">
        <span className="carta-mes__verso">
          <Verso />
          <span className="carta-mes__dica">Toque para revelar</span>
        </span>
        <span className="carta-mes__frente">
          <span className="carta-mes__mes">{pm.mes}</span>
          <Icone id="lua" className="carta-mes__icone" />
          <span className="carta-mes__nome">{pm.nome}</span>
          <span className="carta-mes__de">de R$ {pm.precoDe}</span>
          <span className="carta-mes__preco"><small>R$</small>{pm.preco}</span>
          <span className="carta-mes__prazo">{textoPrazo(pm.fim)}</span>
        </span>
      </span>
    </button>
  );
}

function TextoComCupom({ texto, cupom }) {
  if (!cupom) return texto;
  const [antes, depois] = texto.split("{cupom}");
  return <>{antes}<span className="cupom">{cupom}</span>{depois}</>;
}

export default function Promocoes() {
  return (
    <section className="promocoes" id="promocoes" aria-labelledby="promo-titulo">
      <div className="promocoes__cabeca">
        <p className="rotulo rotulo--vela">Promoções ativas</p>
        <h2 id="promo-titulo" className="titulo-secao">A carta do <span className="script">mês</span></h2>
      </div>

      <div className="promocoes__grade">
        <CartaDoMes />
        <div className="promocoes__lado">
          <div className="promo-mes-texto">
            <p>{pm.texto}</p>
            <a className="botao botao--vela" href={linkWhats(`Olá, Lya! Quero a promoção do mês: ${pm.nome} por R$ ${pm.preco}.`)} target="_blank" rel="noopener">
              Quero a carta do mês
            </a>
          </div>
          <ul className="promo-lista">
            {promocoes.map((p) => (
              <li className="promo" key={p.titulo}>
                <Icone id={p.icone} className="promo__icone" />
                <div>
                  <h3 className="promo__titulo">{p.titulo}</h3>
                  <p><TextoComCupom texto={p.texto} cupom={p.cupom} /></p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
