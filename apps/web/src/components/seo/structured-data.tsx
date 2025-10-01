import { Metadata } from 'next';

export function buildHomeMetadata(baseUrl: string): Metadata {
  const url = new URL(baseUrl);
  return {
    title: 'Magnus Servis | Servis i prodaja profesionalne opreme',
    description:
      'Magnus Servis je specijaliziran za prodaju i servis caffe aparata, perilica, ledomata i hladnjača.',
    openGraph: {
      type: 'website',
      url: url.toString(),
      siteName: 'Magnus Servis',
      title: 'Magnus Servis – profesionalni servis i webshop',
      description:
        'Magnus Servis osigurava prodaju, održavanje i hitne intervencije za profesionalnu ugostiteljsku opremu.',
    },
    alternates: {
      canonical: url.toString(),
    },
  };
}

export function localBusinessJsonLd(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Magnus Servis',
    description:
      'TODO: Dodati službeni opis tvrtke i registrirane djelatnosti.',
    url: baseUrl,
    telephone: 'TODO: Dodati broj telefona',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'TODO: Dodati adresu',
      addressLocality: 'TODO: Grad',
      postalCode: 'TODO',
      addressCountry: 'HR',
    },
    areaServed: 'European Union',
  };
}

export function serviceJsonLd(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Servis profesionalnih caffe aparata i opreme',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Magnus Servis',
      url: baseUrl,
    },
    areaServed: ['Croatia', 'Slovenia', 'Italy'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'TODO: Popis usluga',
    },
  };
}
