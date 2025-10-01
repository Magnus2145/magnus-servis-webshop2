import { PageBuilder } from '@/src/components/cms/page-builder';
import { fetchPageBySlug } from '@/src/lib/cms';

export default async function UslugePage({ params: { locale } }: { params: { locale: string } }) {
  const page = await fetchPageBySlug('usluge', locale);

  return <PageBuilder sections={page?.sections ?? []} locale={locale} />;
}
