interface PostalAddress {
  locality: string;
  region: string;
  postalCode?: string;
  country: string;
  countryCode: string;
}

interface OpeningHours {
  summary: string;
  schemaSpec: ReadonlyArray<{
    dayOfWeek: ReadonlyArray<string>;
    opens: string;
    closes: string;
  }>;
}

interface BusinessConfig {
  businessName: string;
  ownerName: string;
  primaryEmail: string;
  secondaryEmail: string;
  phone: string;
  phoneDisplay: string;
  facebookUrl: string;
  domain: string;
  tagline: string;
  slogan: string;
  serviceAreaSummary: string;
  bookingModel: string;
  paymentModel: string;
  responsePromise: string;
  hours: OpeningHours;
  address: PostalAddress;
}

export const businessConfig: BusinessConfig = {
  businessName: 'Curl Up Club Cat Sitting',
  ownerName: 'Leah',
  primaryEmail: 'contact@curlupclub.com',
  secondaryEmail: 'leah@curlupclub.com',
  phone: '+447399036272',
  phoneDisplay: '07399 036272',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61580661264339',
  domain: 'curlupclub.com',
  tagline: 'Cat Sitting in and around the Dee Valley',
  slogan: 'Cat Sitting in and around the Dee Valley',
  serviceAreaSummary:
    'Llangollen, Chirk, Ruabon, Wrexham County Borough and Gobowen.',
  bookingModel: 'Manual enquiry and confirmation',
  paymentModel:
    'Payment is by invoice and bank transfer. Card payment via Stripe can be arranged on request.',
  responsePromise: 'Replies as soon as possible, any day of the week',
  hours: {
    summary: 'Always open. Enquiries answered as soon as possible.',
    schemaSpec: [
      {
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '00:00',
        closes: '23:59',
      },
    ],
  },
  address: {
    locality: 'Wrexham',
    region: 'Wrexham County Borough',
    country: 'United Kingdom',
    countryCode: 'GB',
  },
};
