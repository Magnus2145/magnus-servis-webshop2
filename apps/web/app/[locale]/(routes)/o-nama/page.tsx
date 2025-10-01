import { fetchPageBySlug } from '@/src/lib/cms';

export default async function ONamaPage() {
  const page = await fetchPageBySlug('o-nama');

  return (
    <article className="prose prose-slate max-w-none dark:prose-invert">
      <h1>{page?.title ?? 'O nama'}</h1>
      {page?.content ? (
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      ) : (
        <p>TODO: Dodati priču o Magnus Servisu i timu.</p>
      )}
      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-primary">TODO: Član tima {item}</h3>
            <p className="text-sm text-muted-foreground">TODO: Kratka biografija i certifikati.</p>
          </div>
        ))}
      </section>
    </article>
  );
}
