import { PageBuilder } from '@/src/components/cms/page-builder';
import { fetchPageBySlug } from '@/src/lib/cms';

export default async function PravilaKolaciciPage({ params: { locale } }: { params: { locale: string } }) {
  const page = await fetchPageBySlug('pravila-kolacici', locale);

  return <PageBuilder sections={page?.sections ?? []} locale={locale} />;
}
