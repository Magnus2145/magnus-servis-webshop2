import { fetchPageBySlug } from '@/src/lib/cms';

export default async function PravilaKolaciciPage() {
  const page = await fetchPageBySlug('pravila-kolacici');

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <h1>{page?.title ?? 'Pravila o kolačićima'}</h1>
      {page?.content ? (
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      ) : (
        <p>TODO: Dodati informacije o kolačićima i alat za privole.</p>
      )}
    </article>
  );
}
