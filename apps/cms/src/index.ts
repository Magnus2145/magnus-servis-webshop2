const defaultPages = [
  {
    slug: 'homepage',
    hr: {
      title: 'Naslovnica',
      seoTitle: 'Magnus Servis — Profesionalni servis i webshop',
      seoDescription: 'TODO: Dodati opis stranice za tražilice.',
      sections: [
        {
          __component: 'sections.hero-section',
          eyebrow: 'Magnus Servis',
          title: 'TODO: Glavni naslov hero sekcije',
          subtitle: 'TODO: Dodati kratak opis tvrtke i ključne benefite.',
          primaryCtaLabel: 'Zatraži servis',
          primaryCtaHref: '/servis',
          secondaryCtaLabel: 'U trgovinu',
          secondaryCtaHref: '/trgovina',
          backgroundStyle: 'gradient',
        },
        {
          __component: 'sections.feature-grid',
          title: 'Zašto Magnus Servis?',
          subtitle: 'TODO: Zamijeni ključne benefite vlastitim sadržajem.',
          columns: 3,
          features: [
            {
              title: 'Ovlašteni servis',
              description: 'TODO: Dodati detalj o servisnim ovlaštenjima.',
              icon: 'wrench',
            },
            {
              title: 'Brza intervencija',
              description: 'TODO: Dodati informacije o dostupnosti i responzivnosti.',
              icon: 'zap',
            },
            {
              title: 'B2B podrška',
              description: 'TODO: Opisati prilagođene pakete i cjenike.',
              icon: 'briefcase',
            },
          ],
        },
        {
          __component: 'sections.call-to-action',
          title: 'Spremni za suradnju?',
          body: 'TODO: Poziv na akciju — kontaktirajte tim ili pošaljite upit.',
          ctaLabel: 'Kontaktiraj nas',
          ctaHref: '/kontakt',
          tone: 'primary',
        },
      ],
    },
    en: {
      title: 'Homepage',
      seoTitle: 'Magnus Servis — Service & equipment experts',
      seoDescription: 'TODO: Provide an English SEO description.',
      sections: [
        {
          __component: 'sections.hero-section',
          eyebrow: 'Magnus Servis',
          title: 'TODO: Replace with the main English headline',
          subtitle: 'TODO: Add a short overview of services and expertise.',
          primaryCtaLabel: 'Request service',
          primaryCtaHref: '/servis',
          secondaryCtaLabel: 'Visit store',
          secondaryCtaHref: '/trgovina',
          backgroundStyle: 'gradient',
        },
        {
          __component: 'sections.feature-grid',
          title: 'Why Magnus Servis?',
          subtitle: 'TODO: Replace feature highlights with your own copy.',
          columns: 3,
          features: [
            {
              title: 'Authorized technicians',
              description: 'TODO: Mention certifications and training.',
              icon: 'wrench',
            },
            {
              title: 'Rapid response',
              description: 'TODO: Describe service level agreements.',
              icon: 'zap',
            },
            {
              title: 'B2B enablement',
              description: 'TODO: Explain custom pricing and support.',
              icon: 'briefcase',
            },
          ],
        },
        {
          __component: 'sections.call-to-action',
          title: 'Ready to collaborate?',
          body: 'TODO: Add a strong call-to-action for prospects.',
          ctaLabel: 'Contact us',
          ctaHref: '/kontakt',
          tone: 'primary',
        },
      ],
    },
  },
  {
    slug: 'servis',
    hr: {
      title: 'Servis',
      sections: [
        {
          __component: 'sections.hero-section',
          title: 'TODO: Naslov servisne stranice',
          subtitle: 'TODO: Opiši koje brendove i tipove opreme servisirate.',
          primaryCtaLabel: 'Zatraži servis',
          primaryCtaHref: '/kontakt',
          backgroundStyle: 'light',
        },
        {
          __component: 'sections.rich-text',
          title: 'Servisni paketi',
          body: '<p>TODO: Dodati detaljan opis dostupnih servisnih paketa, SLA-ova i pokrivenosti.</p>',
        },
      ],
    },
    en: {
      title: 'Service',
      sections: [
        {
          __component: 'sections.hero-section',
          title: 'TODO: Service page headline',
          subtitle: 'TODO: Describe supported equipment and brands.',
          primaryCtaLabel: 'Book service',
          primaryCtaHref: '/kontakt',
          backgroundStyle: 'light',
        },
        {
          __component: 'sections.rich-text',
          title: 'Service packages',
          body: '<p>TODO: Describe the available maintenance plans and coverage.</p>',
        },
      ],
    },
  },
  {
    slug: 'usluge',
    hr: {
      title: 'Usluge',
      sections: [
        {
          __component: 'sections.rich-text',
          title: 'TODO: Popis Magnus Servis usluga',
          body: '<ul><li>TODO: Preventivni servisi</li><li>TODO: Hitne intervencije</li><li>TODO: Instalacije i edukacija</li></ul>',
        },
        {
          __component: 'sections.media-highlight',
          title: 'Servisni ugovori',
          body: '<p>TODO: Objasni kako funkcioniraju ugovori i što je uključeno.</p>',
          mediaPosition: 'right',
        },
      ],
    },
    en: {
      title: 'Services',
      sections: [
        {
          __component: 'sections.rich-text',
          title: 'TODO: List the services you provide',
          body: '<ul><li>TODO: Preventive maintenance</li><li>TODO: Emergency call-outs</li><li>TODO: Installations & training</li></ul>',
        },
        {
          __component: 'sections.media-highlight',
          title: 'Maintenance contracts',
          body: '<p>TODO: Explain service contracts and benefits.</p>',
          mediaPosition: 'right',
        },
      ],
    },
  },
  {
    slug: 'kontakt',
    hr: {
      title: 'Kontakt',
      sections: [
        {
          __component: 'sections.contact-block',
          title: 'Javite nam se',
          description: 'TODO: Dodati uvodni tekst i detalje o podršci.',
          showForm: true,
          contactItems: [
            { label: 'Telefon', value: 'TODO: +385 XX XXX XXXX', icon: 'phone' },
            { label: 'E-mail', value: 'TODO: info@magnus-servis.com', icon: 'mail' },
            { label: 'Radno vrijeme', value: 'TODO: Pon-Pet 08-16h', icon: 'clock' },
          ],
        },
      ],
    },
    en: {
      title: 'Contact',
      sections: [
        {
          __component: 'sections.contact-block',
          title: 'Get in touch',
          description: 'TODO: Provide a short support introduction.',
          showForm: true,
          contactItems: [
            { label: 'Phone', value: 'TODO: +385 XX XXX XXXX', icon: 'phone' },
            { label: 'Email', value: 'TODO: info@magnus-servis.com', icon: 'mail' },
            { label: 'Office hours', value: 'TODO: Mon-Fri 08-16', icon: 'clock' },
          ],
        },
      ],
    },
  },
  {
    slug: 'trgovina',
    hr: {
      title: 'Trgovina',
      seoDescription: 'TODO: Dodati kratak opis webshop ponude.',
      sections: [
        {
          __component: 'sections.hero-section',
          title: 'TODO: Naslov trgovine',
          subtitle: 'TODO: Uvodi posjetitelje u asortiman opreme i potrošnog materijala.',
          primaryCtaLabel: 'Pregledaj kategorije',
          primaryCtaHref: '/trgovina/perilice',
          secondaryCtaLabel: 'Kontakt',
          secondaryCtaHref: '/kontakt',
          backgroundStyle: 'light',
        },
        {
          __component: 'sections.rich-text',
          body: '<p>TODO: Objasni kako naručiti, rokove dostave i dostupne usluge instalacije ili servisa.</p>',
        },
      ],
    },
    en: {
      title: 'Store',
      seoDescription: 'TODO: Add a short description of your catalogue.',
      sections: [
        {
          __component: 'sections.hero-section',
          title: 'TODO: Store hero headline',
          subtitle: 'TODO: Explain the product range, availability and B2B options.',
          primaryCtaLabel: 'Browse categories',
          primaryCtaHref: '/trgovina/perilice',
          secondaryCtaLabel: 'Contact us',
          secondaryCtaHref: '/kontakt',
          backgroundStyle: 'light',
        },
        {
          __component: 'sections.rich-text',
          body: '<p>TODO: Describe ordering workflow, shipping options and after-sales service.</p>',
        },
      ],
    },
  },
  {
    slug: 'trgovina-perilice',
    hr: {
      title: 'Perilice',
      sections: [
        {
          __component: 'sections.hero-section',
          title: 'TODO: Prikaži ključne benefite perilica',
          subtitle: 'TODO: Dodaj informacije o kapacitetu, uštedama energije i mogućnostima instalacije.',
          backgroundStyle: 'light',
        },
        {
          __component: 'sections.rich-text',
          body: '<p>TODO: Dodaj sadržaj koji opisuje dostupne modele, brendove i preporučenu primjenu.</p>',
        },
      ],
    },
    en: {
      title: 'Dishwashers',
      sections: [
        {
          __component: 'sections.hero-section',
          title: 'TODO: Highlight dishwasher range',
          subtitle: 'TODO: Mention energy efficiency, baskets per hour and supported models.',
          backgroundStyle: 'light',
        },
        {
          __component: 'sections.rich-text',
          body: '<p>TODO: Describe brands, availability and recommended accessories.</p>',
        },
      ],
    },
  },
  {
    slug: 'trgovina-ledomati',
    hr: {
      title: 'Ledomati',
      sections: [
        {
          __component: 'sections.hero-section',
          title: 'TODO: Istakni ključne značajke ledomata',
          subtitle: 'TODO: Kapacitet leda, tip hlađenja i uvjete održavanja.',
          backgroundStyle: 'light',
        },
        {
          __component: 'sections.rich-text',
          body: '<p>TODO: Dodaj savjete za odabir ledomata prema volumenu, tipu leda i instalaciji.</p>',
        },
      ],
    },
    en: {
      title: 'Ice makers',
      sections: [
        {
          __component: 'sections.hero-section',
          title: 'TODO: Showcase ice maker benefits',
          subtitle: 'TODO: Cover production capacity, cube type and service requirements.',
          backgroundStyle: 'light',
        },
        {
          __component: 'sections.rich-text',
          body: '<p>TODO: Provide selection tips by production volume, cooling type and maintenance schedule.</p>',
        },
      ],
    },
  },
  {
    slug: 'o-nama',
    hr: {
      title: 'O nama',
      sections: [
        {
          __component: 'sections.media-highlight',
          title: 'Naša priča',
          body: '<p>TODO: Dodati timeline tvrtke, ključne projekte i reference.</p>',
          mediaPosition: 'left',
        },
        {
          __component: 'sections.feature-grid',
          title: 'Certifikati i partneri',
          columns: 3,
          features: [
            { title: 'TODO: Julius Meinl', description: 'Partner opis', icon: 'award' },
            { title: 'TODO: Protinus', description: 'Partner opis', icon: 'shield' },
            { title: 'TODO: Ostali partneri', description: 'Dodati logotipe i reference', icon: 'users' },
          ],
        },
      ],
    },
    en: {
      title: 'About us',
      sections: [
        {
          __component: 'sections.media-highlight',
          title: 'Our story',
          body: '<p>TODO: Share company milestones, flagship projects and testimonials.</p>',
          mediaPosition: 'left',
        },
        {
          __component: 'sections.feature-grid',
          title: 'Certificates & partners',
          columns: 3,
          features: [
            { title: 'TODO: Julius Meinl', description: 'Partner description', icon: 'award' },
            { title: 'TODO: Protinus', description: 'Partner description', icon: 'shield' },
            { title: 'TODO: Other partners', description: 'Add partner logos and references', icon: 'users' },
          ],
        },
      ],
    },
  },
  {
    slug: 'pravila',
    hr: {
      title: 'Pravila i dokumenti',
      sections: [
        {
          __component: 'sections.link-grid',
          title: 'Pravni dokumenti',
          description: 'TODO: Ovdje dodaj uvodni tekst i poveznice na važne dokumente.',
          links: [
            { label: 'Pravila privatnosti', href: '/pravila/privatnost' },
            { label: 'Uvjeti korištenja', href: '/pravila/uvjeti' },
            { label: 'Pravila o kolačićima', href: '/pravila/kolacici' }
          ],
        },
      ],
    },
    en: {
      title: 'Policies & documents',
      sections: [
        {
          __component: 'sections.link-grid',
          title: 'Legal documents',
          description: 'TODO: Add intro copy and link to legal policies.',
          links: [
            { label: 'Privacy policy', href: '/pravila/privatnost' },
            { label: 'Terms of use', href: '/pravila/uvjeti' },
            { label: 'Cookie policy', href: '/pravila/kolacici' }
          ],
        },
      ],
    },
  },
  {
    slug: 'pravila-privatnost',
    hr: {
      title: 'Pravila privatnosti',
      sections: [
        {
          __component: 'sections.rich-text',
          body: '<p>TODO: Zalijepiti politiku privatnosti.</p>',
        },
      ],
    },
    en: {
      title: 'Privacy policy',
      sections: [
        {
          __component: 'sections.rich-text',
          body: '<p>TODO: Paste your privacy policy.</p>',
        },
      ],
    },
  },
  {
    slug: 'pravila-uvjeti',
    hr: {
      title: 'Uvjeti korištenja',
      sections: [
        {
          __component: 'sections.rich-text',
          body: '<p>TODO: Zalijepiti uvjete korištenja.</p>',
        },
      ],
    },
    en: {
      title: 'Terms of use',
      sections: [
        {
          __component: 'sections.rich-text',
          body: '<p>TODO: Paste the terms of use.</p>',
        },
      ],
    },
  },
  {
    slug: 'pravila-kolacici',
    hr: {
      title: 'Pravila o kolačićima',
      sections: [
        {
          __component: 'sections.rich-text',
          body: '<p>TODO: Dodati pravila o kolačićima.</p>',
        },
      ],
    },
    en: {
      title: 'Cookie policy',
      sections: [
        {
          __component: 'sections.rich-text',
          body: '<p>TODO: Paste your cookie policy.</p>',
        },
      ],
    },
  },
];

const globalSettings = {
  hr: {
    siteName: 'Magnus Servis',
    tagline: 'TODO: Dodati slogan ili kratku poruku brenda.',
    primaryColor: '#0B2545',
    primaryOnColor: '#FFFFFF',
    secondaryColor: '#3E92CC',
    secondaryOnColor: '#FFFFFF',
    accentColor: '#F9C80E',
    accentOnColor: '#0B2545',
    backgroundColor: '#FFFFFF',
    foregroundColor: '#0F172A',
    contactEmail: 'TODO: info@magnus-servis.com',
    contactPhone: 'TODO: +385 XX XXX XXXX',
    address: 'TODO: Ulica i broj, Grad',
    navigation: [
      { label: 'Početna', href: '/' },
      { label: 'Servis', href: '/servis' },
      { label: 'Usluge', href: '/usluge' },
      { label: 'Trgovina', href: '/trgovina' },
      { label: 'Kontakt', href: '/kontakt' },
    ],
    footerColumns: [
      {
        title: 'Magnus Servis',
        links: [
          { label: 'O nama', href: '/o-nama' },
          { label: 'Servis', href: '/servis' },
        ],
      },
      {
        title: 'Podrška',
        links: [
          { label: 'Kontakt', href: '/kontakt' },
          { label: 'Pravila privatnosti', href: '/pravila/privatnost' },
        ],
      },
    ],
    socialLinks: [
      { platform: 'facebook', url: 'https://www.facebook.com', label: 'Facebook' },
      { platform: 'linkedin', url: 'https://www.linkedin.com', label: 'LinkedIn' },
    ],
  },
  en: {
    siteName: 'Magnus Servis',
    tagline: 'TODO: Add a short brand message.',
    primaryColor: '#0B2545',
    primaryOnColor: '#FFFFFF',
    secondaryColor: '#3E92CC',
    secondaryOnColor: '#FFFFFF',
    accentColor: '#F9C80E',
    accentOnColor: '#0B2545',
    backgroundColor: '#FFFFFF',
    foregroundColor: '#0F172A',
    contactEmail: 'TODO: info@magnus-servis.com',
    contactPhone: 'TODO: +385 XX XXX XXXX',
    address: 'TODO: Street and city',
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'Service', href: '/servis' },
      { label: 'Services', href: '/usluge' },
      { label: 'Store', href: '/trgovina' },
      { label: 'Contact', href: '/kontakt' },
    ],
    footerColumns: [
      {
        title: 'Magnus Servis',
        links: [
          { label: 'About us', href: '/o-nama' },
          { label: 'Service', href: '/servis' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Contact', href: '/kontakt' },
          { label: 'Privacy policy', href: '/pravila/privatnost' },
        ],
      },
    ],
    socialLinks: [
      { platform: 'facebook', url: 'https://www.facebook.com', label: 'Facebook' },
      { platform: 'linkedin', url: 'https://www.linkedin.com', label: 'LinkedIn' },
    ],
  },
};

async function ensureGlobal(strapi, locale) {
  const existing = await strapi.entityService.findMany('api::global.global', {
    locale,
  });

  if (!existing || existing.length === 0) {
    await strapi.entityService.create('api::global.global', {
      data: {
        ...globalSettings[locale],
        locale,
        publishedAt: new Date(),
      },
    });
  }
}

async function ensurePage(strapi, pageSeed, locale) {
  const existing = await strapi.entityService.findMany('api::page.page', {
    filters: { slug: pageSeed.slug },
    locale,
  });

  if (!existing || existing.length === 0) {
    const data = pageSeed[locale];
    await strapi.entityService.create('api::page.page', {
      data: {
        slug: pageSeed.slug,
        ...data,
        locale,
        publishedAt: new Date(),
      },
    });
  }
}

export default {
  config: {
    locales: ['hr', 'en'],
  },
  async bootstrap({ strapi }) {
    await ensureGlobal(strapi, 'hr');
    await ensureGlobal(strapi, 'en');

    for (const page of defaultPages) {
      await ensurePage(strapi, page, 'hr');
      await ensurePage(strapi, page, 'en');
    }
  },
};
