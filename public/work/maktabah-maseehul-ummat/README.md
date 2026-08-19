# Maktabah Maseehul Ummat — screenshots

The accordion gallery for this case study is **written and waiting**. It is
parked only because the image files are not here yet.

## Save these nine files here

Export each screenshot as WebP, about 1600px wide, quality 80, under 200 KB:

| Filename | Screen |
| --- | --- |
| `dashboard.webp` | Dashboard Overview |
| `billing-pos.webp` | Billing / POS with the order panel |
| `receipt.webp` | Sale Complete receipt |
| `inventory.webp` | Inventory Management table |
| `transactions.webp` | Sales & Purchases ledger |
| `reports.webp` | Detailed Reports with charts |
| `categories.webp` | Categories table |
| `settings.webp` | Settings and backups |
| `sign-in.webp` | Sign-in screen |

Converting PNGs in this folder:

```bash
npx @squoosh/cli --webp '{"quality":80}' -d . *.png
```

## Then switch it on

In `src/data/projects.js`, on the `maktabah-maseehul-ummat` entry, rename three
keys:

```
galleryStylePending  ->  galleryStyle
coverPending         ->  cover
galleryPending       ->  gallery
```

That is the whole change. Every `alt` and `caption` is already written.

## Two things worth fixing before you export

1. **The mock-mode banner.** Every screenshot carries *"Edge DB Not Configured
   (Mock Mode Active)"* across the top. It is honest, but it tells a visitor the
   system is running without its database. Capture with `DATABASE_URL` set if
   you can.
2. **Empty states.** A few screens show ₹0 and "No transactions found". The
   dashboard and reports screens with real figures are far more convincing —
   use the captures that have data in them.
