export const mainNav = [
  {
    href: '/',
    key: 'nav.home',
  },
  {
    href: '/servis',
    key: 'nav.service',
  },
  {
    href: '/usluge',
    key: 'nav.services',
  },
  {
    href: '/trgovina',
    key: 'nav.shop',
    children: [
      { href: '/trgovina/perilice', key: 'filters.category.perilice' },
      { href: '/trgovina/ledomati', key: 'filters.category.ledomati' },
    ],
  },
  {
    href: '/kontakt',
    key: 'nav.contact',
  },
];
