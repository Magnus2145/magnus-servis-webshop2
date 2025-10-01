import { PageBuilder } from '@/src/components/cms/page-builder';
import { fetchPageBySlug } from '@/src/lib/cms';

export default async function PravilaUvjetiPage({ params: { locale } }: { params: { locale: string } }) {
  const page = await fetchPageBySlug('pravila-uvjeti', locale);

  return <PageBuilder sections={page?.sections ?? []} locale={locale} />;
}
