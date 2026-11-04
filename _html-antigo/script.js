// Número do WhatsApp da Lya: código do país + DDD + número, só dígitos.
const WHATSAPP = "5500000000000";

// Todos os links com data-wa abrem o WhatsApp com a mensagem já escrita.
document.querySelectorAll("[data-wa]").forEach((link) => {
  link.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(link.dataset.wa)}`;
  link.target = "_blank";
  link.rel = "noopener";
});

// Carta do mês: vira sozinha ao aparecer na tela e também com clique.
const cartaMes = document.querySelector(".carta-mes");
if (cartaMes) {
  const virar = (estado) => {
    cartaMes.classList.toggle("virada", estado);
    cartaMes.setAttribute("aria-pressed", String(cartaMes.classList.contains("virada")));
  };
  cartaMes.addEventListener("click", () => virar());

  const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduzido || !("IntersectionObserver" in window)) {
    virar(true);
  } else {
    const obs = new IntersectionObserver((entradas) => {
      if (entradas[0].isIntersecting) {
        setTimeout(() => virar(true), 500);
        obs.disconnect();
      }
    }, { threshold: 0.6 });
    obs.observe(cartaMes);
  }
}

// Prazo da promoção: mostra quantos dias faltam.
const prazo = document.querySelector("[data-fim]");
if (prazo) {
  const fim = new Date(prazo.dataset.fim + "T23:59:59");
  const dias = Math.ceil((fim - new Date()) / 86400000);
  const data = fim.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  if (dias < 0) prazo.textContent = "Promoção encerrada";
  else if (dias <= 1) prazo.textContent = `Último dia · até ${data}`;
  else if (dias <= 10) prazo.textContent = `Faltam ${dias} dias · até ${data}`;
  else prazo.textContent = `Válida até ${data}`;
}

// "O que te traz aqui": rola até a consulta indicada e acende a carta.
document.querySelectorAll("[data-destaca]").forEach((link) => {
  link.addEventListener("click", () => {
    const carta = document.getElementById(link.dataset.destaca);
    if (!carta) return;
    carta.classList.remove("chamada");
    setTimeout(() => carta.classList.add("chamada"), 450);
    carta.addEventListener("animationend", () => carta.classList.remove("chamada"), { once: true });
  });
});

document.getElementById("ano").textContent = new Date().getFullYear();
