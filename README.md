# Abstract Entity Atlas — sito tesi (Vittoria Fornari)

Sito responsive (desktop + mobile) basato sui design Figma `!Design Desktop`
e `!Design System`. Statico: solo HTML, CSS e JavaScript, nessuna build.

## Pagine
- `index.html` — homepage (hero, intro, **Archetipi**, **Il Progetto**, CTA Take Test)
- `quiz.html` — quiz personalità: schermata iniziale + 10 domande (con logica
  "seleziona massimo 2" dove previsto) → porta al risultato
- `result.html` — pagina risultato **Connettore** (entity map + scheda archetipo)

## Come avviarlo
I font `@font-face` vanno serviti via HTTP (non `file://`). Da questa cartella:

```bash
python3 -m http.server 8000
```

Poi apri http://localhost:8000

## Struttura
```
index.html · quiz.html · result.html
css/style.css        → design system (token colori/font) + tutti gli stili
js/quiz.js           → domande + logica del quiz
fonts/               → PP NeueBit Bold, Bakemono Text Light
assets/img/          → grafiche esportate da Figma (loghi, tag archetipi,
                       decori PCB, foto, entity map)
```

## Note
- Il risultato mostra sempre l'archetipo **Connettore** (l'unico prototipato).
  Per aggiungere scoring multi-archetipo: estendere `js/quiz.js` e creare le
  altre pagine risultato.
- La entity map è esportata come immagine dal prototipo Figma; su mobile è
  scorrevole orizzontalmente.
