// Todo o conteúdo do site mora aqui. Troque os exemplos pelos dados reais da Lya.
// ATENÇÃO: preços, promoções, cupom e depoimentos abaixo ainda são EXEMPLOS.

// Número do WhatsApp: código do país + DDD + número, só dígitos.
export const WHATSAPP = "5500000000000";
export const INSTAGRAM = "https://instagram.com/";

export const linkWhats = (mensagem) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem)}`;

export const MENSAGEM_GERAL = "Olá, Lya! Vim pelo site e quero agendar uma consulta.";

// Consultas, na ordem da mesa. `icone` é um id do sprite (Icones.jsx).
export const consultas = [
  {
    id: "pergunta", icone: "brilho", nome: "Pergunta única",
    formato: "1 pergunta · até 10 min", preco: 50,
    descricao: "Para uma dúvida pontual que precisa de resposta direta.",
  },
  {
    id: "tres", icone: "lua", nome: "Tiragem de três", destaque: "Mais pedida",
    formato: "3 perguntas · até 25 min", preco: 120,
    descricao: "Passado, presente e tendência de uma situação, ou três perguntas diferentes.",
  },
  {
    id: "amor", icone: "vinculo", nome: "Amor e vínculos",
    formato: "Leitura focada · 30 min", preco: 140,
    descricao: "O que está em jogo numa relação: sentimentos, intenções e caminhos possíveis.",
  },
  {
    id: "mesa", icone: "olho", nome: "Mesa aberta",
    formato: "36 cartas · 45 min", preco: 180,
    descricao: "Leitura completa no baralho cigano: amor, trabalho, família, saúde e o que está chegando.",
  },
  {
    id: "ano", icone: "sol", nome: "Mapa do ano 2027",
    formato: "12 cartas · 1 h", preco: 270,
    descricao: "Uma carta-guia para cada mês do ano, com as energias e os cuidados de cada fase.",
  },
  {
    id: "acompanhamento", icone: "estrela", nome: "Acompanhamento",
    formato: "3 leituras no mês", preco: 360, precoDe: 420,
    descricao: "Para atravessar uma fase com orientação constante: uma leitura a cada dez dias.",
  },
];

// Painel "O que te traz aqui hoje?": cada opção aponta para uma consulta.
export const intencoes = [
  { consulta: "pergunta", icone: "brilho", titulo: "Uma dúvida pontual", frase: "Preciso de uma resposta direta" },
  { consulta: "amor", icone: "vinculo", titulo: "O coração em dúvida", frase: "Quero entender uma relação" },
  { consulta: "acompanhamento", icone: "estrela", titulo: "Uma fase difícil", frase: "Quero acompanhamento de perto" },
];

// A carta do mês. `fim` no formato AAAA-MM-DD.
export const promocaoDoMes = {
  mes: "Novembro",
  consulta: "tres",
  nome: "Tiragem de três",
  precoDe: 120,
  preco: 89,
  fim: "2026-11-30",
  texto: "Três perguntas sobre o mesmo assunto ou sobre assuntos diferentes, com até 25 minutos de leitura em áudio.",
};

export const promocoes = [
  { icone: "brilho", titulo: "Primeira leitura", texto: "10% de desconto em qualquer consulta. Use o cupom {cupom} ao agendar.", cupom: "PRIMEIRALUA" },
  { icone: "vinculo", titulo: "Leve uma amiga", texto: "Duas consultas de Pergunta única por R$ 80, uma para você e outra para quem você indicar." },
  { icone: "sol", titulo: "Vale-presente", texto: "Qualquer consulta pode virar presente. A pessoa recebe um cartão digital e agenda quando quiser." },
];

export const passos = [
  { titulo: "Escolha a consulta", texto: "Veja as leituras e clique em “Agendar” na que fizer sentido para você." },
  { titulo: "Combine o horário", texto: "No WhatsApp, você escolhe o dia, envia suas perguntas e paga por Pix ou cartão." },
  { titulo: "Receba a leitura", texto: "No dia marcado, a leitura chega em áudio. Ouça ao vivo ou quando puder, com calma." },
];

// EXEMPLOS: substituir por depoimentos reais, com autorização das clientes.
export const depoimentos = [
  { texto: "Saí da leitura com a cabeça no lugar. Ela foi clara sem ser dura, e explicou cada carta.", autora: "Nome da cliente", consulta: "Tiragem de três" },
  { texto: "O áudio chegou certinho no horário. Ouvi duas vezes e anotei tudo. Já agendei o mapa do ano.", autora: "Nome da cliente", consulta: "Mesa aberta" },
  { texto: "Fiz o acompanhamento durante uma mudança de emprego e me senti amparada o mês inteiro.", autora: "Nome da cliente", consulta: "Acompanhamento" },
];

export const duvidas = [
  { pergunta: "Como recebo a leitura?", resposta: "Em áudio, pelo WhatsApp, no dia e horário agendados. Você pode ouvir na hora ou depois." },
  { pergunta: "Preciso estar online no horário?", resposta: "Não. Se preferir acompanhar ao vivo, avise no agendamento. Se não, o áudio fica guardado na conversa para quando você puder ouvir." },
  { pergunta: "Como faço o pagamento?", resposta: "Por Pix ou cartão, no momento do agendamento. O horário fica reservado assim que o pagamento é confirmado." },
  { pergunta: "Posso remarcar?", resposta: "Sim, com pelo menos 24 horas de antecedência. É só avisar pelo WhatsApp." },
  { pergunta: "Como uso um cupom ou promoção?", resposta: "Informe o cupom ou o nome da promoção na mensagem de agendamento. O desconto é aplicado antes do pagamento." },
  { pergunta: "A leitura substitui médico, advogado ou terapeuta?", resposta: "Não. O tarot é uma ferramenta de orientação e autoconhecimento. Questões de saúde, jurídicas ou financeiras devem ser tratadas com profissionais da área." },
];

// A tiragem do topo: cinco arcanos, cada um com uma mensagem curta
// e a consulta que conversa com ele.
export const arcanos = [
  { numero: "XVIII", nome: "A Lua", icone: "lua", consulta: "tres",
    mensagem: "Nem tudo está claro ainda. Dê tempo ao que está se revelando." },
  { numero: "XIX", nome: "O Sol", icone: "sol", consulta: "ano",
    mensagem: "Um ciclo de clareza se abre. Bom momento para decidir com calma." },
  { numero: "XVII", nome: "A Estrela", icone: "estrela", consulta: "acompanhamento",
    mensagem: "Depois da tempestade vem a esperança. Cuide de você nesta fase." },
  { numero: "VI", nome: "Os Enamorados", icone: "vinculo", consulta: "amor",
    mensagem: "Uma escolha do coração pede atenção. Ouça o que você sente." },
  { numero: "X", nome: "A Roda", icone: "roda", consulta: "mesa",
    mensagem: "As coisas estão se movendo. Observe o que muda ao seu redor." },
];

export const consultaPorId = (id) => consultas.find((c) => c.id === id);
