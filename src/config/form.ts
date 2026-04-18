export const formConfig = {
  bookingRequestEndpoint:
    import.meta.env.PUBLIC_FORM_ENDPOINT || '/api/booking-request',
  clientIntakeEndpoint:
    import.meta.env.PUBLIC_INTAKE_ENDPOINT || '/api/client-intake',
  turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '',
  honeypotFieldName: 'website_url',
  consentLabel: 'I agree to the Privacy Policy and Terms & Conditions',
  successRedirect: '/thank-you/',
} as const;
