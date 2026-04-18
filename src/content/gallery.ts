export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

// To add or replace gallery photos, drop the file into /public/images/gallery/
// and add a new entry below. The src must start with /images/gallery/.
// Keep alt text descriptive and avoid identifying owners by name.
export const galleryContent = {
  pageTitle: 'Gallery',
  pageDescription:
    'A small gallery of cats and quiet moments from in-home sitting visits.',
  intro:
    'A small selection of cats and calm moments from sitting visits. New photos are added gradually, only ever with the owner\u2019s permission.',
  images: [
    {
      src: '/images/gallery/cats-grid-collage.png',
      alt: 'Collage of sixteen different cats Leah has cared for, including tuxedos, tabbies, ginger and black cats',
      caption:
        'A few of the many cats Curl Up Club has looked after across the Dee Valley.',
    },
    {
      src: '/images/gallery/tuxedo-cat-portrait.png',
      alt: 'Tuxedo cat sitting alert in front of a wooden chest of drawers',
      caption: 'A calm portrait taken during a sitting visit.',
    },
    {
      src: '/images/gallery/cat-tower.jpg',
      alt: 'Three cats relaxing together on a cat tree at home',
      caption:
        'Cats stay relaxed in their own home, with all their familiar perches.',
    },
  ] as GalleryImage[],
} as const;
