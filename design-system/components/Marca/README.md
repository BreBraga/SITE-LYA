# Marca

A assinatura da Lya: o nome em Pinyon Script (`marca-nome`, `vela`) seguido de "cartomante" em Cormorant Unicase espaçada.

Não há logotipo desenhado: a marca é esta composição tipográfica. Use-a só sobre `noite` ou `ameixa`, no topo e no rodapé.

**O que você fornece:** um link para o início com `aria-label="Lya Cartomante, início"`, e dentro dele `.marca__nome` e `.marca__oficio`.

```html
<a class="marca" href="#inicio" aria-label="Lya Cartomante, início">
  <span class="marca__nome">Lya</span>
  <span class="marca__oficio">cartomante</span>
</a>
```

- Faça: deixe a cor de `.marca__oficio` vir do contêiner (`pergaminho` no escuro).
- Não faça: colocar a marca sobre `nevoa` ou `pergaminho`, onde `vela` dá 1.7:1. Também não troque a fonte do nome nem acrescente símbolos.
