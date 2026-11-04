A Lya é cartomante: lê tarot e baralho cigano e entrega a leitura em áudio pelo WhatsApp. O sistema veste a mesa de leitura: linho ameixa, cartas de pergaminho, luz de vela. Tudo o que tem preço é carta; tudo o que é fundo é toalha.

## Voz e conteúdo

- Escreva em português do Brasil, falando com "você". A Lya fala em primeira pessoa ("Eu sou a Lya"; "Leio cartas para…").
- Use sentence case em tudo, inclusive botões: "Ver consultas e valores", não "Ver Consultas E Valores". A caixa alta vem só dos estilos `formato` e `selo`.
- Use verbos claros e o mesmo nome da ação do começo ao fim: o botão diz "Agendar", a mensagem pronta diz "quero agendar", o passo II diz "Combine o horário".
- Seja direto e acolhedor, sem prometer o futuro. A leitura "mostra caminhos, tendências e pontos de atenção" e "não decide por você". Nunca escreva "garantido", "100%" ou "amarração".
- Nas promoções, diga a regra inteira numa frase e sempre mostre o preço "de". Não use "imperdível", "só hoje", exclamações ou contagem em segundos.
- Não use emoji. O mistério vem do traço fino, não de 🔮✨.
- Escreva o texto pensando em quem pode estar ansiosa: frases curtas e respostas que começam com "Sim" ou "Não".
- Mantenha o vocabulário fixo: consulta, leitura, tiragem, carta, mesa, áudio, agendar. Não alterne com "sessão", "atendimento" ou "jogo".

Exemplos reais da página:
- Hero: "Clareza para o seu *caminho*" e "Você escolhe a consulta, agenda o horário e recebe a leitura em áudio no seu WhatsApp, no dia marcado."
- Intenção: "Uma dúvida pontual / Preciso de uma resposta direta"
- Dúvida: "Preciso estar online no horário?" "Não. Se preferir acompanhar ao vivo, avise no agendamento."

## Cor

O roxo predomina. A página alterna fundos como quem muda de luz ao longo da noite: hero `ameixa` → painel `nevoa` → promoções `nevoa` → mesa `toalha` → como funciona `nevoa` → depoimentos `lavanda` → sobre e dúvidas `nevoa` → chamada final `ameixa` → rodapé `noite`.

- Fundos escuros: `noite`, `ameixa`, `toalha`, sempre com a textura de linho (`--ruido` e `--trama` em `bundle.css`) e um brilho radial `vela` a 13–18% num canto, como uma vela fora de quadro.
- Fundos claros: `nevoa` para a página; `lavanda` só nos depoimentos; `pergaminho` só na face das cartas; `branco` só nos cartões de promoção.
- `vela` é o único acento quente e aparece pouco: a palavra em script, o preço e a moldura da carta do mês, o botão principal e o selo. Sobre fundo claro, nunca como texto (1.7:1). Lá o dourado é `vela-escura`, e a palavra em script vira `toalha`.
- Texto em fundo escuro: `pergaminho`; apoio em `pergaminho-mudo`; rótulos em `lavanda`.
- Texto em fundo claro: `tinta`; apoio em `tinta-suave`; legendas em `tinta-muda`; títulos em `ameixa`.
- Não use gradiente roxo para azul, neon ou preto puro. O mais escuro é `noite`.

## Tipografia

Três famílias, cada uma com uma função:
- **Cormorant Unicase** (`display`): títulos, nomes de carta, preços e rótulos. As caixas alta e baixa misturadas são a voz antiga da marca.
- **Pinyon Script** (`script`): UMA palavra por título (`script-acento`) e o nome "Lya". Nunca uma frase, nunca texto corrido.
- **Bellota Text** (`corpo`): todo o texto que se lê: lead, corpo, botões, legendas.

Escala: `titulo-hero` 5.6rem → `titulo-final` 4rem → `titulo-secao` 3.6rem → `preco` 3.4rem → `nome-carta` 1.75rem → `titulo-passo` 1.5rem → `lead` 1.15rem → `corpo` 1.0625rem → `legenda` .88rem. Os títulos escalam com `clamp()` (veja o `usage` de cada estilo). As fontes vêm do Google Fonts: o `@import` está no topo de `bundle.css`.

## Espaço e layout

- O conteúdo tem no máximo `largura-conteudo` (1160px); as dúvidas usam 860px para a leitura ficar confortável.
- Seções: `secao-y` (7rem; 7.5rem nas promoções e na mesa) de respiro vertical e `secao-x` de margem lateral. Do título ao conteúdo, `cabeca-secao`.
- A ordem da página segue a da referência: hero → intenção → promoções → consultas e valores → como funciona → depoimentos → sobre → dúvidas → chamada final → rodapé.
- Pontos de quebra: 1100px (mesa em 2 colunas), 980px (promoções e depoimentos empilham), 860px (some o menu; hero empilha com o leque em cima; passos na vertical), 520px (mesa em 1 coluna; botões do hero em largura total).

## A carta como forma

A carta é o motivo da marca. Use-a com intenção:
- Proporção 3:5, moldura dupla recuada em `moldura-externa` (9px) e `moldura-interna` (13px), cantos `raio`.
- Na mesa, as cartas pousam tortas (−1.4°, 1.1°, −0.5°) e se endireitam ao serem tocadas.
- Sombras só em cartas e no que flutua: `sombra-carta`, `sombra-carta-erguida`, `sombra-carta-mes`, `sombra-painel`, `sombra-flutuante`. O resto da página é plano.
- Os depoimentos e a foto do Sobre usam o arco (`raio-arco` ou `raio-pilula` no topo, `raio` na base), como um portal.

## Movimento

São quatro momentos, nada além disso:
1. O leque do hero se distribui ao carregar.
2. A carta do mês vira quando aparece.
3. As cartas se endireitam no hover.
4. A carta escolhida no painel de intenção acende.

Os brilhos do leque cintilam a cada 4s. Com `prefers-reduced-motion`, tudo fica parado no estado final, e a carta do mês já aparece de frente.

## Foco e acessibilidade

- Anel de foco: `outline: 2px solid var(--vela)` com `outline-offset: 2px` e `box-shadow: 0 0 0 2px var(--ameixa)`. O `ameixa` aparece em fundo claro (11:1) e o `vela` em fundo escuro (6.5:1). Não remova nem troque o anel.
- Todo texto passa de 4.5:1 sobre o fundo indicado no `usage` da cor. A exceção documentada é `vela` sobre `toalha` (4.3:1), usado só em título de 24px ou mais.
- Há um link "Pular para os valores" no começo da página. Leque e ícones são `aria-hidden`; a carta do mês é um `<button>` com `aria-pressed`.

## Iconografia

- São seis ícones de traço fino feitos para a marca: `brilho`, `lua`, `sol`, `olho`, `vinculo` e `estrela`. Traço de 1.4 a 1.6 numa grade de 48 (o brilho é preenchido, numa grade de 24).
- No site, eles vivem num sprite `<symbol>` no topo do `index.html` (`#i-brilho`, `#i-lua`…) e herdam a cor por `currentColor`: `toalha` em fundo claro, `vela` em fundo escuro. Os arquivos em Assets › Icones são as mesmas formas com tinta `ameixa` fixa.
- Cada ícone tem um significado. Use-o sempre com o mesmo:

| Ícone | Uso |
| --- | --- |
| `brilho` | Dúvida pontual ou primeira leitura |
| `lua` | Tiragem, intuição |
| `vinculo` | Amor e relações |
| `olho` | Leitura completa |
| `sol` | O ano e os presentes |
| `estrela` | Acompanhamento |

- **WhatsApp:** o ícone do WhatsApp no site é um redesenho provisório. Troque-o pelo ícone oficial da página de marca do WhatsApp antes de publicar. Os previews daqui usam um balão de conversa genérico (`i-conversa`) de propósito.
- Não use emoji, ícones de biblioteca genérica nem símbolos religiosos de terceiros.

## Imagens

- As ilustrações são as cartas em SVG (Assets › Cartas): o verso ornamentado e A Lua (XVIII). Não use fotos de banco de imagem, bola de cristal ou mãos com cartas.
- O arco do Sobre recebe a foto da Lya (luz quente, fundo escuro, sem filtro roxo forte). Até ela chegar, o arco mostra a `lua` em `vela` sobre `toalha`.
- As fotos de referência (velas, cristais, toalha de linho) definiram a paleta e o clima. São inspiração e não vão para o site.

## Marca

Não há logotipo desenhado. A assinatura é tipográfica: "Lya" em Pinyon Script `vela` + "cartomante" em Cormorant Unicase espaçada (veja o componente Marca). Use só sobre `noite` ou `ameixa`.

## Conteúdo de exemplo

Ainda são exemplos e precisam ser confirmados com a Lya antes de publicar: os preços (R$ 50 a R$ 360), a promoção de novembro (Tiragem de três por R$ 89), o cupom PRIMEIRALUA, os depoimentos e o texto do Sobre. Os componentes mostram esses textos só para dar forma.
