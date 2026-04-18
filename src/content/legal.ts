// TODO: confirm "Last updated" date and review final wording with the business owner before publishing.
export const legalContent = {
  privacyPolicy: {
    title: 'Privacy Policy',
    lastUpdated: 'TBC',
    intro: 'This website is operated by Curl Up Club Cat Sitting.',
    sections: [
      {
        title: 'What information we collect',
        body: [
          'When you use our contact form we may collect your name, email address and phone number, information about your pet or pets, requested dates for pet sitting and any other information you choose to provide.',
        ],
      },
      {
        title: 'How we use your information',
        body: [
          'We use your information to respond to enquiries, arrange and provide pet sitting services, manage bookings and invoicing and keep basic records of services provided.',
        ],
      },
      {
        title: 'How we store your information',
        body: [
          'Your information is stored securely in email inboxes, the contact form system and personal records related to bookings.',
          'We keep your information only as long as necessary for providing services and basic record-keeping.',
        ],
      },
      {
        title: 'Sharing your information',
        body: [
          'We do not sell or share your personal data with third parties except where required by law or in an emergency involving your pet\u2019s welfare, such as contacting a vet.',
        ],
      },
      {
        title: 'Your rights',
        body: [
          'You have the right to request access to your data, ask for corrections and request deletion of your data where legally possible.',
          'To do so, please contact contact@curlupclub.com.',
        ],
      },
      {
        title: 'Cookies',
        body: [
          'This website does not set non-essential cookies. If that changes, you will be notified before any non-essential cookies are used.',
        ],
      },
    ],
  },
  termsAndConditions: {
    title: 'Terms & Conditions',
    lastUpdated: 'TBC',
    intro:
      'By using this website and submitting an enquiry you agree to the following.',
    sections: [
      {
        title: 'Bookings',
        body: [
          'Submitting a form does not guarantee a booking.',
          'A booking is only confirmed once it has been agreed by both parties in writing.',
          'Availability is not guaranteed until confirmed.',
        ],
      },
      {
        title: 'Payment',
        body: [
          'Payment is invoiced after booking confirmation.',
          'Payment terms are stated on each invoice.',
          'Services may be refused if payment is not made within agreed terms.',
        ],
      },
      {
        title: 'Cancellations',
        body: [
          'Cancellations should be made as soon as possible.',
          'Cancellation terms may vary depending on notice given and booking type.',
        ],
      },
      {
        title: 'Pet information',
        body: [
          'Owners must provide accurate and up-to-date information about their pets.',
          'This includes health conditions, behaviour issues and care requirements.',
          'Failure to disclose relevant information may result in cancellation of service.',
        ],
      },
      {
        title: 'Liability',
        body: [
          'Reasonable care will be taken at all times.',
          'The owner remains responsible for ensuring pets are healthy, vaccinated where applicable and suitable for care.',
          'We are not liable for illness or injury arising from undisclosed conditions or pre-existing issues.',
        ],
      },
      {
        title: 'Right to refuse service',
        body: [
          'We reserve the right to refuse or cancel a booking if necessary.',
        ],
      },
    ],
  },
} as const;
