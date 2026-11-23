import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { categorias, consultas, consultaPorId, linkWhats } from "../dados.js";
import { Icone } from "./Icones.jsx";

const categoriaPorId = (id) => categorias.find((k) => k.id === id);
// React 18 não conhece `inert`: passado como string, vira o atributo no HTML.
const inerte = (sim) => (sim ? { inert: "" } : {});

// Carta da tiragem: a frente mostra só nome e valor; ao tocar, ela vira e
// mostra objetivo, perguntas e o botão de agendar.
function Carta({ c, virada, onVirar, chamada }) {
  const cat = categoriaPorId(c.categoria);
  const n = c.perguntas.length;
  const formato = c.formato || (n ? `${n} perguntas` : cat.nome);
  const mensagem = c.valores
    ? `Olá, Lya! Quero fazer perguntas no ${c.nome}.`
    : `Olá, Lya! Quero agendar a tiragem ${c.nome} (R$ ${c.preco}).`;

  return (
    <article className={`carta-tiragem${virada ? " virada" : ""}${chamada ? " chamada" : ""}`} id={`c-${c.id}`}>
      <div className="carta-tiragem__giro">
        <button
          type="button"
          className="carta-tiragem__face carta-tiragem__frente"
          onClick={onVirar}
          aria-expanded={virada}
          aria-controls={`v-${c.id}`}
          {...inerte(virada)}
        >
          <span className="carta-tiragem__formato">{formato}</span>
          <Icone id={c.icone || cat.icone} className="carta-tiragem__icone" />
          <span className="carta-tiragem__nome">{c.nome}</span>
          <span className="carta-tiragem__preco">
            {c.valores && <span className="carta-tiragem__apartir">a partir de</span>}
            <small>R$</small>{c.preco}
          </span>
          <span className="carta-tiragem__dica">Toque para virar</span>
        </button>

        <div className="carta-tiragem__face carta-tiragem__verso" id={`v-${c.id}`} {...inerte(!virada)}>
          <button type="button" className="carta-tiragem__voltar" onClick={onVirar} aria-label={`Desvirar a carta ${c.nome}`}>
            <span aria-hidden="true">×</span>
          </button>
          <h3 className="carta-tiragem__titulo">{c.nome}</h3>
          <div className="carta-tiragem__rolagem">
            <p>{c.objetivo}</p>
            {n > 0 && (
              <>
                <p className="carta-tiragem__sub">{c.rotulo ? "Áreas" : "Perguntas"}</p>
                <ol>{c.perguntas.map((p) => <li key={p}>{p}</li>)}</ol>
              </>
            )}
            {c.valores && (
              <ul className="carta-tiragem__valores" aria-label="Valores por quantidade de perguntas">
                {c.valores.map((v) => (
                  <li key={v.perguntas}>
                    <span>{v.perguntas} {v.perguntas === 1 ? "pergunta" : "perguntas"}</span>
                    <strong>R$ {v.preco}</strong>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="carta-tiragem__pe">
            {!c.valores && <span className="carta-tiragem__valor"><small>R$</small>{c.preco}</span>}
            <a className="botao botao--carta" href={linkWhats(mensagem)} target="_blank" rel="noopener">Agendar</a>
          </div>
        </div>
      </div>
    </article>
  );
}

const ENTRADA = { oculta: { opacity: 0, y: 50 }, visivel: { opacity: 1, y: 0 } };

export default function Mesa({ chamada }) {
  const reduzido = useReducedMotion();
  const [aba, setAba] = useState(categorias[0].id);
  const [virada, setVirada] = useState(null);
  // quando uma tiragem é chamada (painel de intenção ou carta do topo), a mesa abre
  // o tema dela, rola até a carta, vira a carta e ela acende por 1.6s
  const [revelada, setRevelada] = useState(false);
  const [pulso, setPulso] = useState(null);
  useEffect(() => {
    if (!chamada) return;
    const alvo = consultaPorId(chamada.id);
    if (!alvo) return;
    setAba(alvo.categoria);
    setRevelada(true);
    setPulso(null);
    setVirada(null);
    const rolar = setTimeout(() => {
      document.getElementById(`c-${chamada.id}`)?.scrollIntoView({ behavior: reduzido ? "auto" : "smooth", block: "center" });
    }, 60);
    const virar = setTimeout(() => setVirada(chamada.id), 650);
    const acender = setTimeout(() => setPulso(chamada.id), 900);
    const apagar = setTimeout(() => setPulso(null), 2500);
    return () => [rolar, virar, acender, apagar].forEach(clearTimeout);
  }, [chamada, reduzido]);

  // ao trocar de tema as cartas aparecem na hora (a animação de entrada é só da primeira vez)
  const trocarAba = (id) => { setAba(id); setVirada(null); setRevelada(true); };
  const atual = categoriaPorId(aba);
  const lista = consultas.filter((c) => c.categoria === aba);

  return (
    <section className="mesa" id="consultas" aria-labelledby="consultas-titulo">
      <div className="mesa__cabeca">
        <p className="rotulo">Tiragens e valores</p>
        <h2 id="consultas-titulo" className="titulo-secao">Escolha a sua <span className="script">tiragem</span></h2>
        <p className="mesa__nota">Escolha um tema e toque numa carta para ver o objetivo, as perguntas e agendar.</p>
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
            onClick={() => trocarAba(k.id)}
          >
            <Icone id={k.icone} />
            {k.nome}
            <span className="mesa__conta">{consultas.filter((c) => c.categoria === k.id).length}</span>
          </button>
        ))}
      </div>

      <div id="mesa-painel" role="tabpanel" aria-labelledby={`aba-${aba}`}>
        {atual.texto && <p className="mesa__tema">{atual.texto}</p>}
        <div className="mesa__baralho" key={aba}>
          {lista.map((c, i) => (
            <motion.div
              key={c.id}
              className={`mesa__lugar${virada === c.id ? " mesa__lugar--virada" : ""}`}
              variants={ENTRADA}
              initial={reduzido || revelada ? false : "oculta"}
              whileInView="visivel"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ type: "spring", stiffness: 90, damping: 16, delay: (i % 4) * 0.08 }}
            >
              <Carta
                c={c}
                virada={virada === c.id}
                onVirar={() => setVirada((v) => (v === c.id ? null : c.id))}
                chamada={pulso === c.id}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
