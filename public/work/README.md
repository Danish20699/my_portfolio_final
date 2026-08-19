# Project screenshots

Drop images here, add two lines to `src/data/projects.js`, done. No component
changes required.

## 1. Add the files

One folder per project, named after its `slug`:

```
public/work/
├── eliigen/
│   ├── sign-in.webp
│   ├── create-account.webp
│   └── sign-in-mobile.webp
└── travel-victor/
    ├── cover.webp
    ├── search.webp
    └── checkout.webp
```

## 2. Point the project at them

In `src/data/projects.js`, on the project object:

```js
{
  slug: 'travel-victor',
  // ...

  // Full-width plate directly under the title. Landscape works best.
  cover: {
    src: '/work/travel-victor/cover.webp',
    alt: 'The Travel Victor search results page with availability and prices',
  },

  // Grid below Outcome. Click opens a lightbox.
  gallery: [
    {
      src: '/work/travel-victor/search.webp',
      alt: 'Search results with filters applied',
      caption: 'Availability resolves without a full page reload',
    },
    {
      src: '/work/travel-victor/checkout.webp',
      alt: 'Checkout step showing booking summary',
      caption: 'The multi-step flow collapsed into one decision per screen',
    },
  ],
}
```

Both fields are optional. A project with neither renders exactly as it does now.

If the gallery has an odd number of images, the first one spans the full width
and the rest pair off — so 3, 5 or 7 images lay out better than 2 or 4.

Thumbnails are cropped to a uniform 4:3 mount, so mixing a portrait phone shot
with a wide dashboard shot is fine. The lightbox shows each image whole.

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
