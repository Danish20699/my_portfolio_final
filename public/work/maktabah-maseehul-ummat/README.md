# Maktabah Maseehul Ummat — screenshots

Nine screens, WebP at 1600px, 13–56 KB each (379 KB total). Wired to the
accordion gallery via `gallery` in `src/data/projects.js`.

| File | Screen | Why this capture |
| --- | --- | --- |
| `dashboard.webp` | Dashboard | ₹27,100 inventory value, ₹5,880 sales — the populated one |
| `billing-pos.webp` | Billing / POS | The till with a live order in the panel |
| `receipt.webp` | Receipt | Completed sale, invoice INV-099182 |
| `inventory.webp` | Inventory | Shows the red Low Stock flag on Bukhari Sharif |
| `transactions.webp` | Transactions | Populated ledger, SALE and PURCHASE rows |
| `reports.webp` | Reports | ₹5,880 revenue, 25.2% margin, both charts drawn |
| `categories.webp` | Categories | — |
| `settings.webp` | Settings | Backup and auto-backup |
| `sign-in.webp` | Sign in | — |

Empty-state duplicates (₹0 revenue, "No transactions found") were discarded.

## The mock-mode banner

Every capture carries *"Edge DB Not Configured (Mock Mode Active)"*. It is kept
deliberately. The Approach section claims the system runs with no database
configured; the banner is that claim demonstrating itself. Cropping it would
have meant editing evidence to look better than it is.

If you later capture with `DATABASE_URL` set, replace the files using the same
names and adjust the dashboard caption, which currently references the banner.

## Adding or replacing

Export WebP, 1600px wide, quality 80. Keep the filenames and everything else
updates itself.
