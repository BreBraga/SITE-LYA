# Arcano

A consulta como carta de tarot: face `pergaminho` com moldura dupla em `ameixa`, ícone, formato, nome, descrição, preço e "Agendar".

As cartas pousam na `toalha` levemente tortas (−1.4°, 1.1°, −0.5°, alternando por posição) e se endireitam, subindo 8px, no hover ou quando algo dentro delas recebe foco. É o elemento que define a marca: preço sempre em carta, nunca em tabela.

**O que você fornece:**
- `id` para o painel de intenção apontar.
- Um ícone (`.arcano__icone`, 54px, `toalha`).
- `.arcano__formato`: quantidade e duração, "3 perguntas · até 25 min".
- `.arcano__nome` em `nome-carta`.
- `.arcano__desc`: uma frase sobre para quem é.
- `.arcano__preco`: `<small>R$</small>` e o número. Para desconto, acrescente `<s>R$ 420</s>` antes.
- Um `.botao--carta` com a mensagem de agendamento já escrita.

| Variante | Uso |
| --- | --- |
| `.arcano--destaque` + `.arcano__selo` | A consulta mais pedida: contorno `vela` de 2px e selo. Uma por mesa. |

- Faça: grade de 3 colunas acima de 1100px, 2 entre 520 e 1100px, 1 abaixo disso. Prefira número par de cartas (6 fecha as duas grades).
- Faça: preço sem centavos.
- Não faça: lista de benefícios com checks, nem mais de uma frase de descrição.
