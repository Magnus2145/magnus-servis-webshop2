import { fetchPageBySlug } from '@/src/lib/cms';

export default async function KontaktPage() {
  const page = await fetchPageBySlug('kontakt');

  return (
    <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
      <article className="prose prose-slate max-w-none dark:prose-invert">
        <h1>{page?.title ?? 'Kontakt'}</h1>
        {page?.content ? (
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
        ) : (
          <p>TODO: Dodati kontakt informacije iz CMS-a.</p>
        )}
        <form className="mt-10 space-y-4" action="#" method="post">
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="name">
              Ime i prezime
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="mt-1 w-full rounded-md border border-border px-3 py-2"
              placeholder="Vaše ime"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="mt-1 w-full rounded-md border border-border px-3 py-2"
              placeholder="primjer@magnus-servis.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground" htmlFor="message">
              Poruka
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="mt-1 w-full rounded-md border border-border px-3 py-2"
              placeholder="Kako vam možemo pomoći?"
            />
          </div>
          <button type="submit" className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white">
            Pošalji poruku (TODO: povezati s backendom)
          </button>
        </form>
      </article>
      <aside className="space-y-6 rounded-xl border bg-muted/50 p-6">
        <h2 className="text-lg font-semibold text-primary">Brzi kontakt</h2>
        <p className="text-sm text-muted-foreground">
          TODO: Dodati broj telefona, WhatsApp i radno vrijeme.
        </p>
        <div className="h-48 w-full rounded-lg bg-muted">
          <p className="p-4 text-sm text-muted-foreground">TODO: Ugraditi Google Maps.</p>
        </div>
      </aside>
    </div>
  );
}
