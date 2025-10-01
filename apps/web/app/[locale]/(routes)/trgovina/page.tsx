import Link from 'next/link';
import { BrandFilter } from '@/src/components/filters/brand-filter';
import { ProductCard } from '@/src/components/product-card';
import { fetchProducts } from '@/src/lib/medusa';
import { getTranslations } from 'next-intl/server';

const categories = [
  { slug: 'perilice', translationKey: 'filters.category.perilice' },
  { slug: 'ledomati', translationKey: 'filters.category.ledomati' },
];

export default async function TrgovinaPage({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { brand?: string };
}) {
  const brand = searchParams.brand;
  const products = await fetchProducts({
    limit: 24,
    'tags[]': brand,
  }).catch(() => []);
  const t = await getTranslations('shop');
  const translate = await getTranslations();

  return (
    <div className="grid gap-8 md:grid-cols-[260px_1fr]">
      <aside className="space-y-6">
        <div className="rounded-lg border p-4">
          <h2 className="text-sm font-semibold uppercase text-muted-foreground">Kategorije</h2>
          <div className="mt-3 flex flex-col space-y-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${locale}/trgovina/${category.slug}`}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {translate(category.translationKey)}
              </Link>
            ))}
          </div>
        </div>
        <BrandFilter />
      </aside>
      <section className="space-y-6">
        <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-primary">Trgovina</h1>
            <p className="text-sm text-muted-foreground">
              TODO: Dodati uvodni tekst trgovine iz CMS-a.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            {brand ? `Filtrirano po brandu: ${brand}` : 'Svi brandovi'}
          </div>
        </header>
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/50 p-16 text-center">
            <h2 className="text-xl font-semibold text-primary">{t('empty.title')}</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">{t('empty.description')}</p>
            <a
              href={`/${locale}/admin`}
              className="mt-4 inline-flex rounded-md border border-primary px-4 py-2 text-sm font-semibold text-primary"
            >
              {t('empty.cta')}
            </a>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} id={product.id} title={product.title} image={product.thumbnail} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
