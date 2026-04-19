export interface FaqItem {
  question: string;
  answer: string;
}

export const faqContent = {
  pageTitle: 'Frequently asked questions',
  pageDescription:
    'Common questions about how Curl Up Club cat sitting works, including booking, payment and visit updates.',
  // TODO: review final wording with the business owner before publishing.
  // Some answers reference policies that may need confirming (meet-and-greet, medication scope).
  items: [
    {
      question: 'Does sending the form confirm a booking?',
      answer:
        'No. Submitting the enquiry form starts the conversation. A booking is only confirmed once the dates, requirements and availability have been agreed directly.',
    },
    {
      question: 'Do you offer a meet and greet before the first booking?',
      answer:
        'A short meet and greet is always arranged, around a week before a booking starts. This is a time when I can meet your cat if they are happy to, but most importantly so you can show me around and ask any extra questions. This is also usually the most convenient time for key collection.',
    },
    {
      question: 'Can medication be given during visits?',
      answer:
        'Medication can usually be given during visits. The exact arrangement is always discussed and agreed before the booking is confirmed.',
    },
    {
      question: 'How will I hear from you while I am away?',
      answer:
        'Updates are sent after visits and may include a short note about food, litter, behaviour and a photo where possible. You can tell us how often you want to hear from us. I prefer to use WhatsApp but can also update by text if preferred',
    },
    {
      question: 'How does payment work?',
      answer:
        'Payment is by invoice and bank transfer once the booking is confirmed. Card payment via Stripe can be arranged on request.',
    },
    {
      question: 'What if my cat is shy or nervous?',
      answer:
        "Shy cats are given space and are not forced to interact. Visits still include feeding, water, litter care and a careful welfare check, even if it is only confirming that your cat has been seen from a distance, or seeing evidence that they've eaten or used the litter tray.",
    },
    {
      question: 'How do you keep keys secure?',
      answer:
        'Keys are kept securely in my home and labelled discreetly with no address information. I use an airtag keyring during your booking. Key collection and return arrangements are agreed directly with you. I hand deliver the keys after your booking. I do not post keys after my last visit, but I can post them once you are home from your trip if you prefer.',
    },
  ] as FaqItem[],
} as const;
