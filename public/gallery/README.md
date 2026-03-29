# Gallery Configuration Guide

## How to Add Your Own Images

### Step 1: Add Images to Project
1. Add your images to the `public/gallery/` folder
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
   - Recommended size: 300x300px or similar
   - Try to keep file sizes under 100KB for performance

### Step 2: Update Gallery Config
Edit `src/config/galleryConfig.js` and add your image paths:

```javascript
export const galleryImages = [
  '/gallery/my-image1.jpg',
  '/gallery/my-image2.png',
  '/gallery/my-image3.webp',
  // ... add more images
];
```

### Step 3: Add Descriptions (Optional)
You can add descriptions for each image:

```javascript
export const galleryImageDescriptions = {
  '/gallery/my-image1.jpg': 'My First Project',
  '/gallery/my-image2.png': 'My Second Project',
  '/gallery/my-image3.webp': 'My Third Project',
};
```

### Example File Structure
```
public/
├── gallery/
│   ├── project1.jpg
│   ├── project2.jpg
│   ├── screenshot1.png
│   └── design-mockup.webp
├── images/
└── danish-logo.png
```

### Tips
- **Add More Images**: Just add more paths to the `galleryImages` array
- **Remove Images**: Simply remove the path from the array
- **Reorder Images**: Change the order in the array
- **Use External URLs**: You can also use full URLs if preferred
  ```javascript
  'https://example.com/images/my-image.jpg'
  ```

### Changes Made
- Gallery configuration is now centralized in `src/config/galleryConfig.js`
- Footer automatically loads images from this config
- No need to modify React components to change images
- Easy to add, remove, or reorder images

## Image Recommendations
- **Dimensions**: 300x300px (square) or 400x300px (rectangle)
- **Format**: JPG for photos, PNG for graphics with transparency
- **Size**: 20-50KB per image for optimal loading
- **Count**: 5-12 images works best for the gallery

Happy customizing! 🎨
