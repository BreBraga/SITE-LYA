# Leque

A tiragem do hero: cinco cartas abertas em leque, 13° entre elas, com A Lua (XVIII) de frente no centro e quatro versos, mais três brilhos `vela` que cintilam devagar.

Ao carregar, as cartas são distribuídas do centro para fora (1.1s cada, 110ms de intervalo). É a única animação de entrada da página. Com movimento reduzido, aparecem já abertas.

**O que você fornece:** um `.leque` com `aria-hidden="true"` (é decorativo) e cinco `<svg class="leque__carta" style="--i:N">`, N de −2 a 2, usando os símbolos `#verso` e `#frente-lua` do sprite. A carta do meio leva `.leque__carta--frente`.

- Faça: manter A Lua no centro; ela é a carta da intuição e a imagem da marca.
- Não faça: usar fotos de cartas, trocar por baralho de outra marca ou girar o leque continuamente.
