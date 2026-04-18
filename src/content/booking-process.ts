export interface BookingStep {
  number: string;
  title: string;
  body: string;
}

export const bookingProcessContent = {
  pageTitle: 'How booking works',
  intro:
    'Booking is intentionally personal and manual. The aim is to understand your cat before agreeing to the visits.',
  steps: [
    {
      number: '01',
      title: 'Send a short enquiry',
      body: 'Use the booking request form to share your dates, area and the basics of what you need.',
    },
    {
      number: '02',
      title: 'Receive a reply from Leah',
      body: 'Availability is checked and you will receive a personal reply to talk through your booking.',
    },
    {
      number: '03',
      title: 'Complete the care details',
      body: 'If the booking looks suitable, you will receive a more detailed client form to capture care instructions and practical information.',
    },
    {
      number: '04',
      title: 'Booking confirmed',
      body: 'Once details are agreed, the booking is confirmed manually and an invoice is sent for payment.',
    },
  ] as BookingStep[],
} as const;
