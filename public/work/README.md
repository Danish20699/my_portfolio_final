# Project screenshots

Drop images here, add two lines to `src/data/projects.js`, done. No component
changes required.

## 1. Add the files

One folder per project, named after its `slug`:

```
public/work/
├── quantafons-hisaab/
│   ├── cover.webp
│   ├── dashboard.webp
│   ├── budgets.webp
│   └── approvals.webp
└── eliigen/
    ├── cover.webp
    ├── batches.webp
    └── live-lecture.webp
```

## 2. Point the project at them

In `src/data/projects.js`, on the project object:

```js
{
  slug: 'quantafons-hisaab',
  // ...

  // Full-width plate directly under the title. Landscape works best.
  cover: {
    src: '/work/quantafons-hisaab/cover.webp',
    alt: 'The Hisaab dashboard showing spend against budget for the month',
  },

  // Grid below Outcome. Click opens a lightbox.
  gallery: [
    {
      src: '/work/quantafons-hisaab/dashboard.webp',
      alt: 'Manager dashboard with category spend charts',
      caption: 'Spend against budget, updating as expenses are filed',
    },
    {
      src: '/work/quantafons-hisaab/budgets.webp',
      alt: 'Budget threshold editor',
      caption: 'Thresholds are editable at runtime',
    },
  ],
}
```

Both fields are optional. A project with neither renders exactly as it does now.

If the gallery has an odd number of images, the first one spans the full width
and the rest pair off — so 3, 5 or 7 images lay out better than 2 or 4.

## 3. Export settings

| | Value |
| --- | --- |
| Format | WebP |
| Width | 1600px for `cover`, 1200px for gallery items |
| Quality | 78–82 |
| Target size | Under 200 KB each |

To convert a folder of PNG screenshots:

```bash
npx @squoosh/cli --webp '{"quality":80}' -d . *.png
```

Everything else on the site is already WebP under 130 KB. Please don't be the
thing that makes the page heavy — the whole site is currently 648 KB of images.

## 4. Writing `alt` and `caption`

They are not the same thing and should not repeat each other.

- **`alt`** describes what is in the frame, for someone who cannot see it.
  "Manager dashboard with category spend charts" — not "screenshot" or
  "dashboard image".
- **`caption`** is visible to everyone and should say something the picture
  cannot: what problem this screen solves, or what to notice in it.

A caption that just names the screen is wasted space. A caption that says
"thresholds are editable at runtime, so a manager doesn't wait on a deploy"
is doing work.
