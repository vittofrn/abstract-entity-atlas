/* ============================================================
   Abstract Entity Atlas — Quiz logic
   Start screen → 10 questions → result (CONNETTORE)
   ============================================================ */

const SOCIALS = ["WhatsApp", "Instagram", "TikTok", "X (Twitter)", "Facebook",
  "LinkedIn", "YouTube", "Twitch", "Reddit", "Telegram", "Discord"];

const MEDIA_LONG = ["Video online brevi (es. TikTok, Reels, Shorts)", "Articoli di News",
  "Video online lunghi (es. video YouTube)", "TVs", "Musica in streaming",
  "Videogiochi", "Radio", "Podcast", "Livestream"];

const MEDIA_SHORT = ["Shorts", "Articoli di News", "Video a lunga durata", "TV",
  "Musica in streaming", "Videogiochi", "Radio", "Podcast", "Livestream"];

const QUESTIONS = [
  { text: "Quando utilizzi internet durante la giornata, qual è il tuo obiettivo principale?",
    max: 1, options: [
      "Parlare con amici, familiari o conoscenti",
      "Informarmi su ciò che accade nel mondo",
      "Cercare prodotti o confrontare prezzi",
      "Utilizzarlo per lavorare",
      "Seguire contenuti sportivi",
      "Restare aggiornato su celebrità, cantanti e artisti",
      "Guardare livestream",
      "Riempire il tempo" ] },

  { text: "Quale di queste attività fai più spesso sui social?",
    max: 1, options: [
      "Messaggiare, commentare, interagire con utenti",
      "Seguire pagine di attualità",
      "Salvare post o link di prodotti",
      "Networking e rimanere aggiornato su opportunità lavorative",
      "Seguire squadre, eventi o risultati sportivi",
      "Seguire aggiornamenti su personaggi famosi e le loro attività",
      "Guardare contenuti live",
      "Utilizzarlo in vari modi per intrattenermi nel tempo libero" ] },

  { text: "Quale social utilizzi di più?", note: "Seleziona massimo 2",
    max: 2, options: SOCIALS },

  { text: "Quali tipi di media consumi più spesso?", note: "Seleziona massimo 2",
    max: 2, options: MEDIA_LONG },

  { text: "Quando apri un social, cosa fai per prima cosa?",
    max: 1, options: [
      "Controllo i messaggi",
      "Scorro per informarmi",
      "Cerco qualche oggetto che mi serve",
      "Controllo mail di lavoro",
      "Guardo risultati o news sportive",
      "Controllo i profili che seguo",
      "Entro in una live o stream",
      "Cerco qualche fonte di intrattenimento" ] },

  { text: "Su quali social interagisci di più con like, commenti, messaggi, condivisioni etc?",
    note: "Seleziona massimo 2", max: 2, options: SOCIALS },

  { text: "Quale media consideri più piacevole da consumare?", note: "Seleziona massimo 2",
    max: 2, options: MEDIA_SHORT },

  { text: "Come descriveresti il tuo rapporto con internet?",
    max: 1, options: [
      "Uno spazio per restare in contatto",
      "Uno strumento per capire il mondo",
      "Un mezzo per acquistare meglio",
      "Un ambiente di lavoro",
      "Un luogo per seguire lo sport",
      "Un modo per seguire persone che ammiro",
      "Un luogo di intrattenimento dal vivo",
      "Un luogo di intrattenimento a tempo perso" ] },

  { text: "Quale social utilizzi più a lungo in un'unica sessione?", note: "Seleziona massimo 2",
    max: 2, options: SOCIALS },

  { text: "Quale media pensi sia stato il più fondamentale durante la tua crescita?",
    note: "Seleziona massimo 2", max: 2, options: MEDIA_SHORT },
];

const TOTAL = QUESTIONS.length;
const answers = QUESTIONS.map(() => []);
let step = -1; // -1 = start screen, 0..9 = questions
let lastProgress = 0; // fraction 0..1, for animating the progress bar

const card = document.getElementById("card");

function renderStart() {
  lastProgress = 0; // reset so the bar grows from empty when the quiz begins
  card.innerHTML = `
    <div class="start">
      <p class="top-note">In media ci vogliono 7 minuti.</p>
      <button class="btn-take" id="startBtn"><span class="inner">Take test</span></button>
      <p class="sub">Vuoi scoprire come appare la tua entità digitale? Raccontaci di te
      in questo test e la creeremo per te.</p>
    </div>`;
  document.getElementById("startBtn").addEventListener("click", () => { step = 0; render(); });
}

function renderQuestion() {
  const q = QUESTIONS[step];
  const selected = answers[step];
  const opts = q.options.map((label, i) => {
    const checked = selected.includes(i);
    const disabled = !checked && selected.length >= q.max;
    return `<div class="opt${checked ? " checked" : ""}${disabled ? " disabled" : ""}" data-i="${i}">
              <span class="box"></span><span>${label}</span>
            </div>`;
  }).join("");

  const isLast = step === TOTAL - 1;
  card.innerHTML = `
    <div class="q-head">
      <div class="q-num">${step + 1}/${TOTAL}</div>
      <div class="q-text">${q.text}${q.note ? `<span class="q-note">(${q.note})</span>` : ""}</div>
    </div>
    <div class="q-progress"><div class="q-progress-fill" style="width:${lastProgress * 100}%"></div></div>
    <div class="q-options">${opts}</div>
    <div class="q-actions">
      <button class="btn-tick ghost" id="prevBtn">Precedente</button>
      <span class="spacer"></span>
      <button class="btn-tick primary" id="nextBtn">${isLast ? "Completa" : "Prossima"}</button>
    </div>`;

  if (step === 0) document.getElementById("prevBtn").style.visibility = "hidden";

  card.querySelectorAll(".opt").forEach(el => {
    el.addEventListener("click", () => toggle(parseInt(el.dataset.i, 10)));
  });
  document.getElementById("prevBtn").addEventListener("click", () => {
    if (step > 0) { step--; render(); } else { step = -1; render(); }
  });
  document.getElementById("nextBtn").addEventListener("click", () => {
    if (isLast) { window.location.href = "result.html"; }
    else { step++; render(); }
  });

  // animate the progress fill from the previous value to the current step
  // (markup starts it at lastProgress; force a reflow, then grow to target)
  const target = (step + 1) / TOTAL;
  const fill = card.querySelector(".q-progress-fill");
  if (fill) {
    void fill.offsetWidth;               // commit the start width
    fill.style.width = target * 100 + "%"; // → CSS transition animates
  }
  lastProgress = target;
}

function toggle(i) {
  const q = QUESTIONS[step];
  const sel = answers[step];
  const pos = sel.indexOf(i);
  if (pos > -1) { sel.splice(pos, 1); }
  else {
    if (q.max === 1) { sel.length = 0; sel.push(i); }
    else if (sel.length < q.max) { sel.push(i); }
  }
  renderQuestion();
}

function render() {
  if (step === -1) renderStart();
  else renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

render();
