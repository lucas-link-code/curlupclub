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
      src: '/images/gallery/cat_1.png',
      alt: 'Long-haired black and white tuxedo cat sitting upright on a grey footstool, with a softly lit lounge in the background',
      caption: 'Calm and confident on familiar territory.',
    },
    {
      src: '/images/gallery/cat-in-box.png',
      alt: 'Ginger and white cat peeking curiously out of a cardboard box on a wooden floor',
      caption: 'Sometimes the box is the favourite spot of the day.',
    },
    {
      src: '/images/gallery/tuxedo-cat-portrait.png',
      alt: 'Tuxedo cat sitting alert in front of a wooden chest of drawers',
      caption: 'A calm portrait taken during a sitting visit.',
    },
    {
      src: '/images/gallery/cat_2.png',
      alt: 'Black cat eating from a small ceramic dish on a leopard-print blanket by a sunlit kitchen window with red geraniums',
      caption: 'Mealtime kept on schedule, in the cat\u2019s usual spot.',
    },
    {
      src: '/images/gallery/cat-tower.jpg',
      alt: 'Three cats relaxing together on a cat tree at home',
      caption:
        'Cats stay relaxed in their own home, with all their familiar perches.',
    },
    {
      src: '/images/gallery/leah-and-clara.png',
      alt: 'Leah smiling gently behind her own tuxedo cat Clara, who is purring with eyes closed against her shoulder',
      caption: 'Leah at home with her own cat Clara.',
    },
    {
      src: '/images/gallery/services_advert.png',
      alt: 'Curl Up Club service summary card titled What is included: tray cleaning and replenishing, meet and greet, feeding and timed feeders reset, water change, treats or snacks given, swapping toys or hiding treats for enrichment, playtime or cuddle time if wanted, plus common extras such as watering plants, bringing in parcels, feeding fish and putting bins out',
      caption: 'A quick visual summary of what each visit can include.',
    },
  ] as GalleryImage[],
} as const;
