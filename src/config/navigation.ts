export interface NavItem {
  label: string;
  href: string;
}

export const mainNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Services', href: '/services/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Gallery', href: '/gallery/' },
  { label: 'Service Area', href: '/service-area/' },
  { label: 'Contact', href: '/contact/' },
];

export const footerNavigation: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy-policy/' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions/' },
  { label: 'FAQ', href: '/faq/' },
];
