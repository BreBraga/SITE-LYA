import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { arcanos, consultaPorId } from "../dados.js";
import { Frente, Icone, Verso } from "./Icones.jsx";

const embaralhar = (lista) => {
  const a = [...lista];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const POSICOES = [-2, -1, 0, 1, 2];

function Tiragem({ onVerConsulta }) {
  const reduzido = useReducedMotion();
  const [rodada, setRodada] = useState(0);
  const [ordem, setOrdem] = useState(() => embaralhar(arcanos));
  const [escolhida, setEscolhida] = useState(null);

  const tirarOutra = () => {
    setEscolhida(null);
    setOrdem(embaralhar(arcanos));
    setRodada((r) => r + 1);
  };

  const arcano = escolhida === null ? null : ordem[escolhida];
  const consulta = arcano && consultaPorId(arcano.consulta);
  const dur = (s) => (reduzido ? 0 : s);

  return (
    <div className="tiragem">
      <div className="tiragem__mesa" key={rodada}>
        {POSICOES.map((p, i) => {
          const esta = escolhida === i;
          const outra = escolhida !== null && !esta;
          return (
            <motion.button
              key={i}
              type="button"
              className="tiragem__carta"
              aria-label={`Tirar a carta ${i + 1} de 5`}
              disabled={escolhida !== null}
              onClick={() => setEscolhida(i)}
              initial={reduzido ? false : { y: 60, rotate: 0, opacity: 0 }}
              animate={
                esta
                  ? { y: -34, rotate: 0, scale: 1.12, opacity: 1, zIndex: 10 }
                  : { y: outra ? 14 : 0, rotate: p * (outra ? 15 : 12), scale: 1, opacity: outra ? 0.45 : 1, zIndex: 5 - Math.abs(p) }
              }
              whileHover={escolhida === null && !reduzido ? { y: -16 } : undefined}
              transition={{
                type: "spring", stiffness: 120, damping: 18,
                delay: escolhida === null ? dur(0.25 + (p + 2) * 0.09) : 0,
              }}
            >
              <motion.span
                className="tiragem__giro"
                animate={{ rotateY: esta ? 180 : 0 }}
                transition={{ duration: dur(0.9), delay: esta ? dur(0.25) : 0, ease: [0.3, 0.1, 0.2, 1] }}
              >
                <span className="tiragem__face tiragem__face--verso"><Verso /></span>
                <span className="tiragem__face tiragem__face--frente">
                  <Frente arcano={ordem[i]} />
                </span>
              </motion.span>
            </motion.button>
          );
        })}
        <Icone id="brilho" className="tiragem__brilho tiragem__brilho--a" />
        <Icone id="brilho" className="tiragem__brilho tiragem__brilho--b" />
        <Icone id="brilho" className="tiragem__brilho tiragem__brilho--c" />
      </div>

      <div className="tiragem__leitura" aria-live="polite">
        <AnimatePresence mode="wait">
          {arcano ? (
            <motion.div
              key={arcano.nome}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: dur(0.4), delay: dur(0.9) }}
            >
              <p className="tiragem__nome">
                <span>{arcano.numero}</span> {arcano.nome}
              </p>
              <p className="tiragem__mensagem">{arcano.mensagem}</p>
              <div className="tiragem__acoes">
                <a className="tiragem__link" href={`#c-${consulta.id}`} onClick={(e) => { e.preventDefault(); onVerConsulta(consulta.id); }}>
                  Consulta indicada: {consulta.nome}
                </a>
                <button type="button" className="tiragem__outra" onClick={tirarOutra}>Tirar outra carta</button>
              </div>
            </motion.div>
          ) : (
            <motion.p key="convite" className="tiragem__convite" exit={{ opacity: 0 }} transition={{ duration: dur(0.2) }}>
              Tire uma carta para o seu dia
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Hero({ onVerConsulta }) {
  return (
    <section className="hero" id="inicio">
      <div className="hero__texto">
        <p className="rotulo">Tarot · Baralho cigano · Leituras por WhatsApp</p>
        <h1 className="hero__titulo">
          Clareza para<br />
          <span className="linha">o seu <span className="script">caminho</span></span>
        </h1>
        <p className="hero__lead">
          Você escolhe a consulta, agenda o horário e recebe a leitura em áudio no seu WhatsApp, no dia marcado.
        </p>
        <div className="hero__acoes">
          <a className="botao" href="#consultas">Ver consultas e valores</a>
          <a className="botao botao--contorno" href="#promocoes">Promoção do mês</a>
        </div>
      </div>
      <Tiragem onVerConsulta={onVerConsulta} />
    </section>
  );
}
