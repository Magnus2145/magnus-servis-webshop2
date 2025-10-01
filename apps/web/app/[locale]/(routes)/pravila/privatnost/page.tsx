import { fetchPageBySlug } from '@/src/lib/cms';

export default async function PravilaPrivatnostiPage() {
  const page = await fetchPageBySlug('pravila-privatnost');

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <h1>{page?.title ?? 'Pravila privatnosti'}</h1>
      {page?.content ? (
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      ) : (
        <p>TODO: Dodati politiku privatnosti izrađenu s odvjetnikom.</p>
      )}
    </article>
  );
}
