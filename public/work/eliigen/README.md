# EliiGen — screenshots

Eleven screens from the admin portal and the student sign-in, WebP at 1600px,
15–37 KB each. Wired to the accordion gallery in `src/data/projects.js`.

## Redaction — read before replacing these

Two screens showed real student data and are **redacted in the committed files**:

| File | What was removed |
| --- | --- |
| `admin-users.webp` | The whole User column — names and emails, every row |
| `manage-students.webp` | The Active Students cards at the foot of the page |

The emails in this system are phone numbers (`91XXXXXXXXXX@eliigen.com`), so
publishing them would have put real students' names and mobile numbers on a
public, search-indexed page. These are minors preparing for NEET.

The redaction is a heavy blur followed by downsample-and-upsample, so the
original text is not recoverable from the published file.

**If you re-capture either screen, redact again before committing.** Easiest
route is to seed the admin panel with obviously fake accounts and shoot that
instead — a demo dataset is better evidence anyway, because it lets you show a
full table without touching real records.

## Everything else

The remaining nine screens contain no personal data — empty forms, batch
pricing, programme structure, notification composer, banner manager, support
queue, and the sign-in screen.

## Replacing or adding

Export WebP, 1600px wide, quality 82. Keep the filenames and the gallery
updates itself; `label`, `alt` and `caption` live in `src/data/projects.js`.
