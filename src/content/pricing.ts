export interface PricingPlan {
  name: string;
  price: string;
  unit: string;
  description: string;
  includes: string[];
  featured?: boolean;
}

export const pricingContent = {
  pageTitle: 'Pricing',
  pageDescription:
    'Simple, transparent pricing for in-home cat sitting and overnight house sitting across the Dee Valley and Wrexham County Borough.',
  intro:
    'Pricing is kept simple and transparent. Drop-in visits are charged per visit, overnight house sitting is charged per night. Final amounts are confirmed when your booking is agreed and may vary slightly depending on location, timing and care requirements.',
  pricingNotes: [
    'Drop-in visits can be booked once or twice daily. Two daily visits are charged as two separate visits.',
    'Overnight house sitting includes evening and morning routine care alongside the overnight stay.',
    'Submitting an enquiry does not guarantee a booking. Availability is confirmed manually after a short conversation.',
    'Travel outside the usual area, additional cats or extra requirements may attract a small charge, quoted at enquiry.',
    'Payment is by invoice and bank transfer. Card payment via Stripe can be arranged on request.',
  ],
  plans: [
    {
      name: 'Drop-in visit',
      price: '£13',
      unit: 'per visit',
      description:
        'A single home visit for feeding, litter, welfare check and a personalised update. Book once or twice a day depending on your cat.',
      includes: [
        'Food and water refresh',
        'Litter tray clean and replenish',
        'General welfare check',
        'Treats or playtime if agreed',
        'Personalised update after the visit',
      ],
    },
    {
      name: 'Overnight house sitting',
      price: '£92',
      unit: 'per night',
      description:
        'Overnight stay in your home for cats who prefer continuous company, with a lived-in feel for the house while you are away.',
      includes: [
        'Overnight presence in your home',
        'Evening and morning routine care',
        'Lights, curtains and a lived-in look',
        'Same personalised updates as drop-in visits',
        'Subject to availability, confirmed per booking',
      ],
      featured: true,
    },
    {
      name: 'Additional requests',
      price: 'Quoted',
      unit: 'as needed',
      description:
        'Medication support, additional cats, longer stays or travel outside the usual area are quoted when enquiring.',
      includes: [
        'Flexible to your requirements',
        'Confirmed before the booking',
        'Travel outside the usual area may incur a small charge',
      ],
    },
  ] as PricingPlan[],
} as const;
