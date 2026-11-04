# Botao

Pílula em `botao-texto`, com o verbo da ação: "Agendar", "Ver consultas e valores", "Quero a carta do mês".

| Variante | Classe | Onde |
| --- | --- | --- |
| Padrão | `.botao` | Ação principal sobre fundo escuro: `pergaminho` com texto `ameixa`. |
| Contorno | `.botao--contorno` | Segunda ação ao lado da padrão, sobre fundo escuro. |
| Vela | `.botao--vela` | A ação que leva ao WhatsApp, sobre `nevoa` ou `ameixa`. Texto `noite` (8.6:1); hover `vela-clara`. |
| Fino | `.botao--fino` | Só no topo fixo: "Agendar" com ícone. |
| Carta | `.botao--carta` | Largura total no pé do Arcano: `ameixa` com texto `pergaminho`; hover `toalha`. |

**O que você fornece:** um `<a>` com `href` (no site, os links de agendamento recebem `data-wa="mensagem"` e o script monta o link do WhatsApp) ou um `<button>`. Ícone opcional como `<svg>` antes do texto, a 1.2em.

- Faça: no máximo um `.botao--vela` por bloco de conteúdo.
- Faça: escreva o que acontece ("Agendar pelo WhatsApp"), não "Clique aqui".
- Não faça: usar `.botao--vela` com texto branco nem `.botao--contorno` sobre fundo claro (a borda some).
- Foco: anel de 2px `ameixa` colado + 2px `vela` por fora, herdado de `:focus-visible`.
