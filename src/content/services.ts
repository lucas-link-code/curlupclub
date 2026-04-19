export interface ServiceItem {
  slug: string;
  title: string;
  description: string;
  includes: string[];
}

export const servicesContent = {
  pageTitle: 'Services',
  pageDescription:
    'In-home cat sitting visits, routine care, gentle enrichment and small household extras when needed.',
  intro:
    'Services centre on calm in-home visits and clear communication. Each visit is shaped to your cat. The list below outlines what most visits include; final wording for any care item is agreed before a booking is confirmed.',
  services: [
    {
      slug: 'daily-visit',
      title: 'Once daily visits',
      description:
        'The standard option. A single home visit each day for cats who are comfortable with one check-in.',
      includes: [
        'Feeding and fresh water',
        'Litter tray cleaning and replenishing',
        'Playtime',
        'General welfare check',
        'Treats if agreed',
        'Update after the visit',
      ],
    },
    {
      slug: 'twice-daily',
      title: 'Twice daily visits',
      description:
        'Morning and evening visits for cats who benefit from more company or a closer routine.',
      includes: [
        'Two visits per day',
        'Routine care repeated morning and evening',
        'More frequent welfare checks',
        'Extra reassurance for owners',
        'Longer playtime',
      ],
    },
    {
      slug: 'care-extras',
      title: 'Care and routine extras',
      description:
        'Small details that help keep cats comfortable and routines consistent.',
      includes: [
        'Timed feeder reset',
        'Toy rotation and gentle enrichment',
        'Playtime or cuddle time if your cat enjoys it',
        'Visual welfare check for shy or nervous cats',
        'Medication support on a case-by-case basis, agreed in advance',
      ],
    },
    {
      slug: 'home-extras',
      title: 'Small household extras',
      description:
        'Helpful extras alongside cat care, agreed when the booking is arranged.',
      includes: [
        'Water house plants',
        'Bring parcels in',
        'Feed fish',
        'Put bins out',
        'Light cleaning duties',
        'Small pet feeding - please enquire',
      ],
    },
    {
      slug: 'overnight-house-sitting',
      title: 'Overnight house sitting',
      description:
        'Offered on a limited, per-booking basis for cats who prefer continuous company. Please enquire to discuss availability.',
      includes: [
        'Limited availability, please enquire to discuss your needs',
      ],
    },
  ] as ServiceItem[],
  dailyUpdates: {
    eyebrow: 'Visit updates',
    title: 'Personalised updates after each visit',
    intro:
      'Daily updates look different for each pet. After visiting, Leah sends a personalised message that may include:',
    points: [
      'Food given and how much was eaten',
      'Any cleaning, including litter trays or litter tray misses',
      'Whether your cat played or had a cuddle',
      'A note when medication has been taken',
      'Confirmation that shy or nervous cats have been spotted, even from a distance',
      'Photos where possible, only when cats are relaxed around the camera',
      'Treats given',
      'House updates if needed',
      "Anything else specific to your cat's care",
    ],
  },
} as const;
