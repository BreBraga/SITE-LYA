import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { consultas, linkWhats } from "../dados.js";
import { Icone } from "./Icones.jsx";

function Arcano({ c, chamada }) {
  return (
    <article className={`arcano${c.destaque ? " arcano--destaque" : ""}${chamada ? " chamada" : ""}`} id={`c-${c.id}`}>
      {c.destaque && <span className="arcano__selo">{c.destaque}</span>}
      <Icone id={c.icone} className="arcano__icone" />
      <p className="arcano__formato">{c.formato}</p>
      <h3 className="arcano__nome">{c.nome}</h3>
      <p className="arcano__desc">{c.descricao}</p>
      <p className="arcano__preco">
        {c.precoDe && <s>R$ {c.precoDe}</s>}
        <small>R$</small>{c.preco}
      </p>
      <a className="botao botao--carta" href={linkWhats(`Olá, Lya! Quero agendar: ${c.nome} (R$ ${c.preco}).`)} target="_blank" rel="noopener">
        Agendar
      </a>
    </article>
  );
}

const ENTRADA = { oculta: { opacity: 0, y: 70 }, visivel: { opacity: 1, y: 0 } };

export default function Mesa({ chamada }) {
  const reduzido = useReducedMotion();
  // quando uma consulta é chamada, as cartas aparecem na hora (sem o deslocamento
  // da entrada) e só então a página rola até a carta, que acende por 1.6s
  const [revelada, setRevelada] = useState(false);
  const [pulso, setPulso] = useState(null);
  useEffect(() => {
    if (!chamada) return;
    setRevelada(true);
    setPulso(null);
    const rolar = setTimeout(() => {
      document.getElementById(`c-${chamada.id}`)?.scrollIntoView({ behavior: reduzido ? "auto" : "smooth", block: "start" });
    }, 30);
    const acender = setTimeout(() => setPulso(chamada.id), 600);
    const apagar = setTimeout(() => setPulso(null), 2300);
    return () => { clearTimeout(rolar); clearTimeout(acender); clearTimeout(apagar); };
  }, [chamada, reduzido]);

  return (
    <section className="mesa" id="consultas" aria-labelledby="consultas-titulo">
      <div className="mesa__cabeca">
        <p className="rotulo">Consultas e valores</p>
        <h2 id="consultas-titulo" className="titulo-secao">Escolha a sua <span className="script">leitura</span></h2>
        <p className="mesa__nota">Todas as leituras são enviadas em áudio pelo WhatsApp. Pagamento por Pix ou cartão no momento do agendamento.</p>
      </div>

      <div className="mesa__cartas">
        {consultas.map((c, i) => (
          <motion.div
            key={c.id}
            className="mesa__lugar"
            variants={ENTRADA}
            initial={reduzido ? false : "oculta"}
            whileInView="visivel"
            animate={revelada ? "visivel" : undefined}
            viewport={{ once: true, amount: 0.25 }}
            transition={revelada ? { duration: 0 } : { type: "spring", stiffness: 90, damping: 16, delay: (i % 3) * 0.12 }}
          >
            <Arcano c={c} chamada={pulso === c.id} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
