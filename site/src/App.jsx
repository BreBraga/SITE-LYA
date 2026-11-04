import { useState } from "react";
import { Sprite } from "./componentes/Icones.jsx";
import Topo from "./componentes/Topo.jsx";
import Hero from "./componentes/Hero.jsx";
import Intencao from "./componentes/Intencao.jsx";
import Promocoes from "./componentes/Promocoes.jsx";
import Mesa from "./componentes/Mesa.jsx";
import { BotaoFlutuante, ChamadaFinal, ComoFunciona, Depoimentos, Duvidas, Rodape, Sobre } from "./componentes/Secoes.jsx";

export default function App() {
  // consulta a acender na mesa (vem do painel de intenção ou da tiragem)
  const [chamada, setChamada] = useState(null);
  const chamar = (id) => setChamada({ id, vez: Date.now() });

  return (
    <>
      <Sprite />
      <a className="pular" href="#consultas">Pular para os valores</a>
      <Topo />
      <main>
        <Hero onVerConsulta={chamar} />
        <Intencao onEscolher={chamar} />
        <Promocoes />
        <Mesa chamada={chamada} />
        <ComoFunciona />
        <Depoimentos />
        <Sobre />
        <Duvidas />
        <ChamadaFinal />
      </main>
      <Rodape />
      <BotaoFlutuante />
    </>
  );
}
