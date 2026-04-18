export const serviceAreaContent = {
  pageTitle: 'Service area',
  pageDescription:
    'In-home cat sitting across the Dee Valley and Wrexham County Borough, including Llangollen, Chirk, Ruabon, Wrexham and Gobowen.',
  intro:
    'Curl Up Club covers cat owners across the Dee Valley and Wrexham County Borough. The map shows an approximate coverage area only and never displays a home address.',
  areas: [
    'Llangollen',
    'Chirk',
    'Ruabon',
    'Wrexham County Borough',
    'Gobowen',
  ],
  notes: [
    'If you are unsure whether your area is covered, please ask.',
    'A small travel charge may apply outside the usual area.',
    'The map shows an approximate service area only and does not display a home address.',
  ],
  map: {
    center: { lat: 52.97, lng: -3.05 },
    radiusMiles: 10,
    zoom: 11,
  },
} as const;
