import { fetchPageBySlug } from '@/src/lib/cms';

export default async function PravilaUvjetiPage() {
  const page = await fetchPageBySlug('pravila-uvjeti');

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <h1>{page?.title ?? 'Uvjeti korištenja'}</h1>
      {page?.content ? (
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      ) : (
        <p>TODO: Dodati opće uvjete kupnje i korištenja weba.</p>
      )}
    </article>
  );
}
