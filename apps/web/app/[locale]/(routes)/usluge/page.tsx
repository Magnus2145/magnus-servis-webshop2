import { fetchPageBySlug } from '@/src/lib/cms';

export default async function UslugePage() {
  const page = await fetchPageBySlug('usluge');

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <h1>{page?.title ?? 'Usluge'}</h1>
      {page?.content ? (
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      ) : (
        <p>TODO: Dodati popis usluga iz CMS-a.</p>
      )}
    </article>
  );
}
