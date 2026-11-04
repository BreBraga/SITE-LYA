# Topo

Barra fixa (`position: sticky`) em `noite` a 84% com desfoque e um filete `vela` a 18%: marca à esquerda, âncoras no meio e "Agendar" à direita.

**O que você fornece:** a Marca, um `<nav aria-label="Seções">` com até 4 âncoras para as seções da página e um `.botao--fino`.

- As âncoras somem abaixo de 860px; marca e "Agendar" ficam.
- `scroll-padding-top: 84px` no `html` impede que o topo cubra o título da seção.
- Não faça: menu hambúrguer. A página é uma só, rolar é a navegação.
