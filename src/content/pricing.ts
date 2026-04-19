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
    'Pricing is kept simple and transparent. Drop-in visits are charged per visit or per day, overnight house sitting is charged per night. Final amounts are confirmed when your booking is agreed and may vary slightly depending on location, timing and care requirements.',
  pricingNotes: [
    'Once daily drop-in visits are charged per visit. Twice daily drop-in visits are charged as a single daily rate covering both the morning and evening visit.',
    'Overnight house sitting is offered on a limited, per-booking basis and is confirmed subject to availability.',
    'Submitting an enquiry does not guarantee a booking. Availability is confirmed manually after a short conversation.',
    'Travel outside the usual area, additional cats or extra requirements may attract a small charge, quoted at enquiry.',
    'Payment is by invoice and bank transfer. Card payment via Stripe can be arranged on request.',
  ],
  plans: [
    {
      name: 'Drop-in visit, once a day',
      price: '£11',
      unit: 'per visit',
      description:
        'A single daily home visit for feeding, litter, a welfare check and a personalised update. The standard option for most cats.',
      includes: [
        'Food and water refresh',
        'Litter tray clean and replenish',
        'General welfare check',
        'Treats or playtime if agreed',
        'Personalised update after the visit',
      ],
      featured: true,
    },
    {
      name: 'Drop-in visits, twice a day',
      price: '£18',
      unit: 'per day',
      description:
        'Morning and evening drop-in visits for cats who benefit from a closer routine, more company or more regular care.',
      includes: [
        'Two visits per day, morning and evening',
        'Routine care repeated at each visit',
        'More frequent welfare checks',
        'Personalised update after each visit',
        'Reassurance for owners away longer',
      ],
    },
    {
      name: 'Overnight house sitting',
      price: '£92',
      unit: 'per night',
      description:
        'Overnight stay in your home for cats who prefer continuous company. Offered on a limited basis, subject to availability.',
      includes: [
        'Overnight presence in your home',
        'Evening and morning routine care',
        'Lights, curtains and a lived-in look',
        'Same personalised updates as drop-in visits',
        'Confirmed per booking, subject to availability',
      ],
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
