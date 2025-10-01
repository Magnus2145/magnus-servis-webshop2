const defaultPages = [
  { slug: 'homepage', title: 'Naslovnica', heroTitle: 'TODO: Naslov hero sekcije', heroSubtitle: 'TODO: Podnaslov hero sekcije', content: '<p>TODO: Prepiši uvod s postojeće stranice.</p>' },
  { slug: 'servis', title: 'Servis', content: '<p>TODO: Detalji servisnih paketa.</p>' },
  { slug: 'usluge', title: 'Usluge', content: '<p>TODO: Popis Magnus Servis usluga.</p>' },
  { slug: 'kontakt', title: 'Kontakt', content: '<p>TODO: Kontakt informacije i formular.</p>' },
  { slug: 'o-nama', title: 'O nama', content: '<p>TODO: Priča o Magnus Servisu.</p>' },
  { slug: 'pravila-privatnost', title: 'Pravila privatnosti', content: '<p>TODO: Dodati pravila privatnosti.</p>' },
  { slug: 'pravila-uvjeti', title: 'Uvjeti korištenja', content: '<p>TODO: Dodati uvjete korištenja.</p>' },
  { slug: 'pravila-kolacici', title: 'Pravila o kolačićima', content: '<p>TODO: Dodati politiku kolačića.</p>' }
];

export default {
  config: {
    locales: ['hr', 'en'],
  },
  async bootstrap({ strapi }) {
    for (const page of defaultPages) {
      const existing = await strapi.entityService.findMany('api::page.page', {
        filters: { slug: page.slug },
      });
      if (existing.length === 0) {
        await strapi.entityService.create('api::page.page', {
          data: {
            ...page,
            publishedAt: new Date(),
          },
        });
      }
    }
  },
};
