import { fetchPageBySlug } from '@/src/lib/cms';
import { buildHomeMetadata, localBusinessJsonLd, serviceJsonLd } from '@/src/components/seo/structured-data';
import { getTranslations } from 'next-intl/server';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export async function generateMetadata() {
  return buildHomeMetadata(siteUrl);
}

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  const page = await fetchPageBySlug('homepage');
  const heroT = await getTranslations('hero');
  const serviceT = await getTranslations('service');

  return (
    <div className="space-y-12">
      <section className="grid gap-6 rounded-3xl bg-gradient-to-br from-primary via-primary/90 to-secondary px-6 py-16 text-white shadow-lg md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold md:text-4xl">{page?.heroTitle ?? heroT('title')}</h1>
          <p className="text-lg text-white/80">
            {page?.heroSubtitle ?? heroT('subtitle')}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={`/${locale}/servis`}
              className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow hover:bg-accent/90"
            >
              {serviceT('cta')}
            </a>
            <a
              href={`/${locale}/trgovina`}
              className="rounded-lg border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              {heroT('cta.shop')}
            </a>
          </div>
        </div>
        <div className="space-y-4 text-sm text-white/80">
          {page?.content ? (
            <div
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          ) : (
            <p>TODO: Dodati uvodni sadržaj iz CMS-a.</p>
          )}
          <ul className="space-y-2">
            <li>✔ Profesionalni servis caffe aparata i opreme</li>
            <li>✔ B2B cjenici i konfiguracije po mjeri</li>
            <li>✔ Brza dostava i instalacija opreme</li>
          </ul>
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="rounded-xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-primary">TODO: Naslov sekcije {item}</h3>
            <p className="text-sm text-muted-foreground">
              TODO: Zamijeniti opis sekcije {item} sadržajem iz CMS-a.
            </p>
          </div>
        ))}
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessJsonLd(siteUrl)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd(siteUrl)),
        }}
      />
    </div>
  );
}
