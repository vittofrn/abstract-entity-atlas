/* ============================================================
   Abstract Entity Atlas — Archetype data & tag modal interaction
   ============================================================ */

const ARCHETYPES = {
  connettore: {
    name: "Connettore",
    img: "assets/img/tag-connettore.png",
    pop: "50,2%",
    desc: "Utilizza Internet principalmente per mantenere i rapporti sociali, restando in contatto con amici e familiari anche a distanza.",
    media: [
      { label: "40% Musica in streaming", pct: 40 },
      { label: "30% Video a breve durata", pct: 30 },
      { label: "30% Videogiochi", pct: 30 },
    ],
    social: [
      { label: "50% Facebook", pct: 50, color: "#1877F2" },
      { label: "30% Reddit",   pct: 30, color: "#FF4500" },
      { label: "20% YouTube",  pct: 20, color: "#FF0000" },
    ]
  },
  consumatore: {
    name: "Consumatore",
    img: "assets/img/tag-consumatore.png",
    pop: "27,3%",
    desc: "Utilizza la rete per informarsi su prodotti, confrontare offerte e fare acquisti online tramite e-commerce.",
    media: [
      { label: "45% Video a breve durata", pct: 45 },
      { label: "35% Articoli di news", pct: 35 },
      { label: "20% Podcast", pct: 20 },
    ],
    social: [
      { label: "55% Instagram", pct: 55, color: "#FF0069" },
      { label: "25% TikTok",   pct: 25, color: "#00F2EA" },
      { label: "20% YouTube",  pct: 20, color: "#FF0000" },
    ]
  },
  fan: {
    name: "Fan",
    img: "assets/img/tag-fan.png",
    pop: "20,4%",
    desc: "Segue celebrità, creator e influencer, consumando contenuti e aggiornamenti legati ai propri idoli.",
    media: [
      { label: "50% Video a breve durata", pct: 50 },
      { label: "30% Musica in streaming", pct: 30 },
      { label: "20% Livestream", pct: 20 },
    ],
    social: [
      { label: "60% Instagram", pct: 60, color: "#FF0069" },
      { label: "25% TikTok",   pct: 25, color: "#00F2EA" },
      { label: "15% X",        pct: 15, color: "#F1F1F1" },
    ]
  },
  tifoso: {
    name: "Tifoso",
    img: "assets/img/tag-tifoso.png",
    pop: "23,5%",
    desc: "Segue eventi sportivi, squadre e atleti, usando Internet per aggiornamenti, risultati e contenuti legati allo sport.",
    media: [
      { label: "50% Video a breve durata", pct: 50 },
      { label: "30% Livestream", pct: 30 },
      { label: "20% Podcast", pct: 20 },
    ],
    social: [
      { label: "50% X (Twitter)", pct: 50, color: "#F1F1F1" },
      { label: "30% YouTube",     pct: 30, color: "#FF0000" },
      { label: "20% Instagram",   pct: 20, color: "#FF0069" },
    ]
  },
  spettatore: {
    name: "Spettatore",
    img: "assets/img/tag-spettatore.png",
    pop: "23,4%",
    desc: "Utilizza Internet principalmente per guardare contenuti in streaming o dirette, senza interagire attivamente.",
    media: [
      { label: "55% Video a lunga durata", pct: 55 },
      { label: "30% Livestream", pct: 30 },
      { label: "15% TV", pct: 15 },
    ],
    social: [
      { label: "60% YouTube", pct: 60, color: "#FF0000" },
      { label: "25% Twitch",  pct: 25, color: "#9146FF" },
      { label: "15% Discord", pct: 15, color: "#5865F2" },
    ]
  },
  intrattenuto: {
    name: "Intrattenuto",
    img: "assets/img/tag-intrattenuto.png",
    pop: "39,7%",
    desc: "Naviga online soprattutto per intrattenimento e distrazione, usando media e contenuti digitali per riempire il tempo libero.",
    media: [
      { label: "50% Video a breve durata", pct: 50 },
      { label: "30% Shorts e Reels", pct: 30 },
      { label: "20% Podcast", pct: 20 },
    ],
    social: [
      { label: "55% TikTok",   pct: 55, color: "#00F2EA" },
      { label: "30% Instagram",pct: 30, color: "#FF0069" },
      { label: "15% YouTube",  pct: 15, color: "#FF0000" },
    ]
  },
  aggiornato: {
    name: "Aggiornato",
    img: "assets/img/tag-aggiornato.png",
    pop: "35,4%",
    desc: "Consulta il web principalmente per informarsi e seguire le notizie, mantenendosi aggiornato su ciò che accade nel mondo.",
    media: [
      { label: "50% Articoli di news", pct: 50 },
      { label: "30% Podcast", pct: 30 },
      { label: "20% Video a lunga durata", pct: 20 },
    ],
    social: [
      { label: "45% LinkedIn",    pct: 45, color: "#0072B1" },
      { label: "35% X (Twitter)", pct: 35, color: "#F1F1F1" },
      { label: "20% Reddit",      pct: 20, color: "#FF4500" },
    ]
  },
  lavoratore: {
    name: "Lavoratore",
    img: "assets/img/tag-lavoratore.png",
    pop: "21,5%",
    desc: "Sfrutta Internet come strumento professionale, per svolgere attività lavorative, ricerche e networking.",
    media: [
      { label: "40% Articoli di news", pct: 40 },
      { label: "35% Podcast", pct: 35 },
      { label: "25% Video a lunga durata", pct: 25 },
    ],
    social: [
      { label: "65% LinkedIn",    pct: 65, color: "#0072B1" },
      { label: "20% X (Twitter)", pct: 20, color: "#F1F1F1" },
      { label: "15% Reddit",      pct: 15, color: "#FF4500" },
    ]
  },
};

/* ── Inline center detail interaction ──────────────────────── */
let activeKey = null;

let isAnimating = false;

function renderDetail(d) {
  const detail = document.querySelector('.ac-detail');
  detail.querySelector('.ac-tag').src  = d.img;
  detail.querySelector('.ac-tag').alt  = d.name;
  detail.querySelector('.ac-desc').textContent = d.desc;
  detail.querySelector('.ac-pop').innerHTML =
    `Rappresenta il <strong>${d.pop}</strong> degli utenti.`;
}

function selectArchetype(key, sourceItem) {
  const d = ARCHETYPES[key];
  if (!d || isAnimating || key === activeKey) return;
  isAnimating = true;

  const center = document.querySelector('.archetipi-center');
  const grid   = document.querySelector('.archetipi-grid');
  const intro  = center.querySelector('.ac-intro');
  const detail = center.querySelector('.ac-detail');

  /* restore previous state instantly when switching tags */
  document.querySelectorAll('.tag-item.is-hidden').forEach(t => t.classList.remove('is-hidden'));
  document.querySelectorAll('.tag-item.is-active').forEach(t => t.classList.remove('is-active'));

  /* 1 — dim remaining tags + dissolve the clicked one */
  grid.classList.add('is-selecting');
  if (sourceItem) sourceItem.classList.add('is-leaving');
  intro.classList.add('fade-out');

  /* 2 — after dissolve, swap views */
  setTimeout(() => {
    if (sourceItem) {
      sourceItem.classList.remove('is-leaving');
      sourceItem.classList.add('is-hidden', 'is-active');
    }
    grid.classList.remove('is-selecting');
    intro.hidden = true;
    intro.classList.remove('fade-out');

    renderDetail(d);
    detail.hidden = false;
    detail.classList.remove('show');
    void detail.offsetWidth; /* force reflow to restart animations */
    detail.classList.add('show');

    activeKey     = key;
    isAnimating   = false;
  }, 380);
}

function resetArchetype() {
  if (isAnimating) return;
  isAnimating = true;

  const center = document.querySelector('.archetipi-center');
  const intro  = center.querySelector('.ac-intro');
  const detail = center.querySelector('.ac-detail');

  /* gently fade the detail down */
  detail.style.transition = 'opacity .3s cubic-bezier(.4,0,.2,1), transform .3s cubic-bezier(.4,0,.2,1)';
  detail.style.opacity    = '0';
  detail.style.transform  = 'translateY(10px)';

  setTimeout(() => {
    detail.hidden = true;
    detail.classList.remove('show');
    detail.style.cssText = '';

    /* fade intro back in */
    intro.hidden = false;
    intro.style.opacity   = '0';
    intro.style.transform = 'translateY(6px)';
    intro.style.transition = 'opacity .35s cubic-bezier(.16,1,.3,1), transform .35s cubic-bezier(.16,1,.3,1)';
    void intro.offsetWidth;
    intro.style.opacity   = '';
    intro.style.transform = '';

    setTimeout(() => { intro.style.cssText = ''; }, 400);

    document.querySelectorAll('.tag-item.is-hidden').forEach(t => t.classList.remove('is-hidden'));
    document.querySelectorAll('.tag-item.is-active').forEach(t => t.classList.remove('is-active'));

    activeKey   = null;
    isAnimating = false;
  }, 300);
}

/* ── Wire up tag clicks ────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tag-item').forEach(item => {
    const img = item.querySelector('img');
    const alt = img?.alt?.toLowerCase().replace(/\s+/g,'');
    if (!alt || !ARCHETYPES[alt]) return;
    item.style.cursor = 'pointer';
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `Scopri ${img.alt}`);
    item.addEventListener('click', () => selectArchetype(alt, item));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectArchetype(alt, item); }
    });
  });

  const backBtn = document.querySelector('.ac-back');
  if (backBtn) backBtn.addEventListener('click', resetArchetype);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && activeKey) resetArchetype(); });
});
