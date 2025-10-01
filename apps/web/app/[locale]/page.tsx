import { PageBuilder } from '@/src/components/cms/page-builder';
import {
  buildHomeMetadata,
  localBusinessJsonLd,
  serviceJsonLd,
} from '@/src/components/seo/structured-data';
import { fetchPageBySlug } from '@/src/lib/cms';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const baseMetadata = buildHomeMetadata(siteUrl);
  const page = await fetchPageBySlug('homepage', params.locale ?? 'hr');

  return {
    ...baseMetadata,
    title: page?.seoTitle ?? baseMetadata.title,
    description: page?.seoDescription ?? baseMetadata.description,
    openGraph: {
      ...baseMetadata.openGraph,
      title: page?.seoTitle ?? baseMetadata.openGraph?.title,
      description: page?.seoDescription ?? baseMetadata.openGraph?.description,
    },
  };
}

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const page = await fetchPageBySlug('homepage', locale);

  return (
    <div className="space-y-12">
      <PageBuilder sections={page?.sections ?? []} locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd(siteUrl)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(siteUrl)),
        }}
      />
    </div>
  );
}
