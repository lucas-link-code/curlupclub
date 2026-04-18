export interface FieldError {
  field: string;
  message: string;
}

export function validateBookingRequest(formData: FormData): FieldError[] {
  const errors: FieldError[] = [];
  const required: Array<[string, string]> = [
    ['ownerName', 'Please share your name so we know how to reply.'],
    ['email', 'Please enter an email address we can reply to.'],
    ['townOrPostcode', 'Please share the town or postcode area for the visits.'],
    ['startDate', 'Please choose a requested start date.'],
    ['endDate', 'Please choose a requested end date.'],
    ['serviceType', 'Please choose a visit frequency.'],
    ['consent', 'Please agree to the Privacy Policy and Terms & Conditions to continue.'],
  ];

  for (const [field, message] of required) {
    const value = formData.get(field);
    if (!value || String(value).trim() === '') {
      errors.push({ field, message });
    }
  }

  const email = String(formData.get('email') ?? '');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push({ field: 'email', message: 'That email address does not look right.' });
  }

  const start = String(formData.get('startDate') ?? '');
  const end = String(formData.get('endDate') ?? '');
  if (start && end && new Date(end) < new Date(start)) {
    errors.push({ field: 'endDate', message: 'End date should be on or after the start date.' });
  }

  return errors;
}
