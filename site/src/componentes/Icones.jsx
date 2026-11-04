// Sprite com os ícones e o verso da carta (os mesmos desenhos de design-system/assets).
// Os ícones herdam a cor por currentColor.
export function Sprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <symbol id="i-brilho" viewBox="0 0 24 24">
          <path d="M12 0C12.9 7.6 16.4 11.1 24 12 16.4 12.9 12.9 16.4 12 24 11.1 16.4 7.6 12.9 0 12 7.6 11.1 11.1 7.6 12 0Z" fill="currentColor" />
        </symbol>
        <symbol id="i-lua" viewBox="0 0 48 48">
          <path d="M30 5A20 20 0 1 0 43 34 16 16 0 0 1 30 5Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="38" cy="10" r="1.2" fill="currentColor" />
          <circle cx="43" cy="18" r=".9" fill="currentColor" />
        </symbol>
        <symbol id="i-sol" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M24 3v8M24 37v8M3 24h8M37 24h8M9 9l5.5 5.5M33.5 33.5 39 39M39 9l-5.5 5.5M14.5 33.5 9 39" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="24" cy="24" r="2" fill="currentColor" />
        </symbol>
        <symbol id="i-olho" viewBox="0 0 48 48">
          <path d="M3 25C12 12 36 12 45 25 36 38 12 38 3 25Z" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="24" cy="25" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="24" cy="25" r="2.6" fill="currentColor" />
          <path d="M24 7v5M14 10l2 4.5M34 10l-2 4.5M6 15l3.5 3M42 15l-3.5 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </symbol>
        <symbol id="i-vinculo" viewBox="0 0 48 48">
          <circle cx="18" cy="25" r="11" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="30" cy="25" r="11" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M24 4.5C24.4 7.6 25.8 9 29 9.5 25.8 10 24.4 11.4 24 14.5 23.6 11.4 22.2 10 19 9.5 22.2 9 23.6 7.6 24 4.5Z" fill="currentColor" />
        </symbol>
        <symbol id="i-estrela" viewBox="0 0 48 48">
          <path d="M24 4l5 13.5L43 15l-9.5 10.5L41 38l-13.2-5L24 46l-3.8-13L7 38l7.5-12.5L5 15l14 2.5Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="24" cy="25" r="2.2" fill="currentColor" />
        </symbol>
        <symbol id="i-roda" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="24" cy="24" r="11" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="24" cy="24" r="3" fill="currentColor" />
          <path d="M24 7v34M7 24h34M12 12l24 24M36 12 12 36" stroke="currentColor" strokeWidth="1.1" />
        </symbol>
        {/* Provisório: troque pelo ícone oficial do WhatsApp antes de publicar. */}
        <symbol id="i-conversa" viewBox="0 0 24 24">
          <path d="M4 5.5h16v10H9.5L5 19.5v-4H4z" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </symbol>

        <symbol id="verso" viewBox="0 0 120 200">
          <rect x="1" y="1" width="118" height="198" rx="7" fill="#2A1840" />
          <rect x="7" y="7" width="106" height="186" rx="4" fill="none" stroke="#E0A86A" strokeWidth=".9" />
          <rect x="11" y="11" width="98" height="178" rx="2" fill="none" stroke="#E0A86A" strokeWidth=".5" opacity=".7" />
          <path d="M60 30 92 100 60 170 28 100Z" fill="none" stroke="#E0A86A" strokeWidth=".7" />
          <path d="M60 46 84 100 60 154 36 100Z" fill="none" stroke="#E0A86A" strokeWidth=".5" opacity=".6" />
          <circle cx="60" cy="100" r="13" fill="none" stroke="#E0A86A" strokeWidth=".8" />
          <path d="M64 89a11 11 0 1 0 7 15 9 9 0 0 1-7-15Z" fill="#E0A86A" />
          <g fill="#E0A86A">
            <circle cx="60" cy="20" r="1.4" /><circle cx="60" cy="180" r="1.4" />
            <circle cx="20" cy="100" r="1" /><circle cx="100" cy="100" r="1" />
            <path d="M22 22l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2Z" />
            <path d="M98 22l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2Z" />
            <path d="M22 170l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2Z" />
            <path d="M98 170l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2Z" />
          </g>
          <path d="M60 22v6M60 172v6M60 62v-6M60 138v6" stroke="#E0A86A" strokeWidth=".5" opacity=".7" />
        </symbol>
      </defs>
    </svg>
  );
}

export function Icone({ id, className }) {
  return (
    <svg className={className} aria-hidden="true">
      <use href={`#i-${id}`} />
    </svg>
  );
}

export function Verso({ className }) {
  return (
    <svg className={className} viewBox="0 0 120 200" aria-hidden="true">
      <use href="#verso" />
    </svg>
  );
}

// Frente de um arcano: moldura de pergaminho, numeral, ícone grande e o nome.
export function Frente({ arcano, className }) {
  return (
    <svg className={className} viewBox="0 0 120 200" aria-hidden="true">
      <rect x="1" y="1" width="118" height="198" rx="7" fill="#F4EBDC" />
      <rect x="7" y="7" width="106" height="186" rx="4" fill="none" stroke="#3B2150" strokeWidth=".9" />
      <rect x="11" y="11" width="98" height="152" fill="none" stroke="#3B2150" strokeWidth=".5" />
      <text x="60" y="26" textAnchor="middle" fontFamily="Cormorant Unicase, serif" fontSize="9" fill="#3B2150">{arcano.numero}</text>
      <circle cx="60" cy="88" r="34" fill="#C9B4E4" opacity=".55" />
      <svg x="30" y="58" width="60" height="60" color="#3B2150">
        <use href={`#i-${arcano.icone}`} />
      </svg>
      <g fill="#3B2150">
        <path d="M90 42l1 2.6 2.6 1-2.6 1-1 2.6-1-2.6-2.6-1 2.6-1Z" />
        <path d="M28 128l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8Z" />
        <circle cx="26" cy="52" r=".9" /><circle cx="96" cy="130" r=".9" />
      </g>
      <path d="M14 160c10-10 22-14 30-10M106 160c-10-10-22-14-30-10" stroke="#3B2150" strokeWidth=".6" fill="none" />
      <text x="60" y="182" textAnchor="middle" fontFamily="Cormorant Unicase, serif" fontSize={arcano.nome.length > 8 ? 9 : 11} letterSpacing="1.5" fill="#3B2150">
        {arcano.nome.toUpperCase()}
      </text>
    </svg>
  );
}
