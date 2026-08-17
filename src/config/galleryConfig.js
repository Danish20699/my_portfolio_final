// Gallery configuration - Easy to add, remove, or reorder your images.
//
// Deliberately curated rather than "every file in /gallery":
//   - DSC_5035_clipdrop-relight.JPG is the same frame as DSC_5035, just
//     relit — adjacent near-identical slides read as a rendering glitch.
//   - Profile_image.jpg.png is already the hero avatar.
// Both files are still on disk; add them back here if you want them.
export const galleryImages = [
  '/gallery/1709304002393.jpg',
  '/gallery/DSC_5152.JPG',
  '/gallery/IMG_20210821_110856.jpg',
  '/gallery/DSC_5035.JPG',
];

// Alt text, read out by screen readers. Describe what is actually in the
// frame — "Image 1" tells a non-sighted visitor nothing.
export const galleryImageDescriptions = {
  '/gallery/1709304002393.jpg': 'Standing on a snow-covered hillside on a misty winter morning',
  '/gallery/DSC_5035.JPG': 'Close portrait, indoors, wearing a dark jacket over a red polo shirt',
  '/gallery/DSC_5035_clipdrop-relight.JPG': 'The same indoor portrait, relit in post-processing',
  '/gallery/DSC_5152.JPG': 'Portrait among blossom trees in a spring garden',
  '/gallery/IMG_20210821_110856.jpg': 'A yellow wildflower in an alpine meadow with mountains behind',
  '/gallery/Profile_image.jpg.png': 'Profile portrait',
};

// Shape expected by <DepthCarousel /> — { image, alt } per slide.
export const galleryItems = galleryImages.map(image => ({
  image,
  alt: galleryImageDescriptions[image] || '',
}));
