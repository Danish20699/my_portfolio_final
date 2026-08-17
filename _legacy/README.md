# Legacy files

These are from the pre-React version of the site. Nothing in the app imports
them — the live stylesheet is `src/index.css` and the app entry is
`src/main.jsx`.

They were moved here (rather than deleted) because this project isn't under
version control yet. Once you've confirmed nothing is missing, this whole
folder can go.

| File | Was | Replaced by |
| --- | --- | --- |
| `styles.css` | Global stylesheet for the static HTML site | `src/index.css` |
| `script.js` | Vanilla JS scroll/nav behaviour | React components + `ScrollReveal` |
