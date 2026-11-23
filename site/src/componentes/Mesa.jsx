import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { categorias, consultas, consultaPorId, linkWhats } from "../dados.js";
import { Icone } from "./Icones.jsx";

const categoriaPorId = (id) => categorias.find((k) => k.id === id);

function Arcano({ c, chamada }) {
  const cat = categoriaPorId(c.categoria);
  const n = c.perguntas.length;
  return (
    <article className={`arcano${c.destaque ? " arcano--destaque" : ""}${chamada ? " chamada" : ""}`} id={`c-${c.id}`}>
      {c.destaque && <span className="arcano__selo">{c.destaque}</span>}
      <Icone id={c.icone || cat.icone} className="arcano__icone" />
      <p className="arcano__formato">{c.formato || (n ? `${n} perguntas` : cat.nome)}</p>
      <h3 className="arcano__nome">{c.nome}</h3>
      <p className="arcano__desc">{c.objetivo}</p>
      {n > 0 && (
        <details className="arcano__perguntas">
          <summary>{c.rotulo || `Ver as ${n} perguntas`}</summary>
          <ol>
            {c.perguntas.map((p) => <li key={p}>{p}</li>)}
          </ol>
        </details>
      )}
      {c.valores ? (
        <ul className="arcano__valores" aria-label="Valores por quantidade de perguntas">
          {c.valores.map((v) => (
            <li key={v.perguntas}>
              <span>{v.perguntas} {v.perguntas === 1 ? "pergunta" : "perguntas"}</span>
              <strong>R$ {v.preco}</strong>
            </li>
          ))}
        </ul>
      ) : (
        <p className="arcano__preco">
          {c.precoDe && <s>R$ {c.precoDe}</s>}
          <small>R$</small>{c.preco}
        </p>
      )}
      <a
        className="botao botao--carta"
        href={linkWhats(c.valores
          ? `Olá, Lya! Quero fazer perguntas no ${c.nome}.`
          : `Olá, Lya! Quero agendar a tiragem ${c.nome} (R$ ${c.preco}).`)}
        target="_blank"
        rel="noopener"
      >
        Agendar
      </a>
    </article>
  );
}

const ENTRADA = { oculta: { opacity: 0, y: 70 }, visivel: { opacity: 1, y: 0 } };

export default function Mesa({ chamada }) {
  const reduzido = useReducedMotion();
  const [aba, setAba] = useState(categorias[0].id);
  // quando uma consulta é chamada, a mesa abre a categoria dela, as cartas aparecem
  // na hora (sem o deslocamento da entrada) e a página rola até a carta, que acende por 1.6s
  const [revelada, setRevelada] = useState(false);
  const [pulso, setPulso] = useState(null);
  useEffect(() => {
    if (!chamada) return;
    const alvo = consultaPorId(chamada.id);
    if (!alvo) return;
    setAba(alvo.categoria);
    setRevelada(true);
    setPulso(null);
    const rolar = setTimeout(() => {
      document.getElementById(`c-${chamada.id}`)?.scrollIntoView({ behavior: reduzido ? "auto" : "smooth", block: "start" });
    }, 60);
    const acender = setTimeout(() => setPulso(chamada.id), 650);
    const apagar = setTimeout(() => setPulso(null), 2350);
    return () => { clearTimeout(rolar); clearTimeout(acender); clearTimeout(apagar); };
  }, [chamada, reduzido]);

  const atual = categoriaPorId(aba);
  const lista = consultas.filter((c) => c.categoria === aba);

  return (
    <section className="mesa" id="consultas" aria-labelledby="consultas-titulo">
      <div className="mesa__cabeca">
        <p className="rotulo">Tiragens e valores</p>
        <h2 id="consultas-titulo" className="titulo-secao">Escolha a sua <span className="script">tiragem</span></h2>
        <p className="mesa__nota">Escolha um tema, veja o objetivo e as perguntas de cada tiragem e agende pelo WhatsApp.</p>
      </div>

      <div className="mesa__abas" role="tablist" aria-label="Temas das tiragens">
        {categorias.map((k) => (
          <button
            key={k.id}
            type="button"
            role="tab"
            id={`aba-${k.id}`}
            aria-selected={aba === k.id}
            aria-controls="mesa-painel"
            className="mesa__aba"
            onClick={() => setAba(k.id)}
          >
            <Icone id={k.icone} />
            {k.nome}
            <span className="mesa__conta">{consultas.filter((c) => c.categoria === k.id).length}</span>
          </button>
        ))}
      </div>

      <div id="mesa-painel" role="tabpanel" aria-labelledby={`aba-${aba}`}>
        {atual.texto && <p className="mesa__tema">{atual.texto}</p>}
        <div className="mesa__cartas" key={aba}>
          {lista.map((c, i) => (
            <motion.div
              key={c.id}
              className="mesa__lugar"
              variants={ENTRADA}
              initial={reduzido || revelada ? false : "oculta"}
              whileInView="visivel"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 90, damping: 16, delay: (i % 3) * 0.12 }}
            >
              <Arcano c={c} chamada={pulso === c.id} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
