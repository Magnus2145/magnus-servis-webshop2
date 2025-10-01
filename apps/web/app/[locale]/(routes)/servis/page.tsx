import { fetchPageBySlug } from '@/src/lib/cms';

export default async function ServisPage() {
  const page = await fetchPageBySlug('servis');

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <h1>{page?.title ?? 'Servis'}</h1>
      {page?.content ? (
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      ) : (
        <p>TODO: Prepiši sadržaj servisnih usluga iz CMS-a.</p>
      )}
    </article>
  );
}
