# CartaDoMes

A promoção do mês como uma carta virada para baixo que se revela: verso `verso` com ornamento `vela`, frente `ameixa` com o preço em `preco-destaque`.

A carta vira sozinha (1.1s, em Y) 0.5s depois de ficar 60% visível, e o clique vira de novo. Com movimento reduzido, ela já aparece de frente. O prazo é calculado a partir de `data-fim`: "Faltam 12 dias · até 30/11" até 10 dias antes; "Último dia"; "Promoção encerrada".

**O que você fornece:** um `<button class="carta-mes" aria-pressed>` com o verso (sprite `#verso` e "Toque para revelar") e a frente com:
- `.carta-mes__mes`: o mês, em `vela`.
- Um ícone.
- `.carta-mes__nome`.
- `.carta-mes__de`: o preço antigo.
- `.carta-mes__preco`: o preço novo.
- `.carta-mes__prazo` com `data-fim="AAAA-MM-DD"`.

- Faça: uma carta do mês por vez, com o texto e o botão `.botao--vela` ao lado.
- Faça: o preço "de" sempre visível, para o desconto ser verdadeiro.
- Não faça: esconder a promoção atrás de cadastro, nem contagem regressiva em segundos.
