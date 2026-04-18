export interface Testimonial {
  name: string;
  location?: string;
  date?: string;
  source?: string;
  quote: string;
  reply?: string;
  draft?: boolean;
}

export const testimonialsContent = {
  pageTitle: 'Kind words from cat owners',
  intro:
    'A few short notes from local cat owners. New testimonials are added with permission only.',
  items: [
    {
      name: 'Joanna Coupe',
      date: '13 September 2025',
      source: 'Facebook recommendation',
      quote:
        'Leah is fantastic! It was the first time we had left our cat and he loves attention so we were a bit apprehensive. Leah gave him lots of love and attention and kept us updated to put our minds at ease. He was a very happy chap with Leah looking after him. We would highly recommend her.',
      reply:
        'Thank you for the review, looking forward to looking after him again soon!',
    },
    {
      name: 'Lauren Murphy',
      date: '12 September 2025',
      source: 'Facebook recommendation',
      quote:
        'We had a really good experience with Leah looking after our cat. She did everything we asked, was professional with us and also really good with our cat. Would 100% recommend her services!',
      reply: 'Always happy to look after her! Thanks for reviewing.',
    },
  ] as Testimonial[],
} as const;
