import { BrandFilter } from '@/src/components/filters/brand-filter';
import { ProductCard } from '@/src/components/product-card';
import { fetchCategoryByHandle, fetchProducts } from '@/src/lib/medusa';
import { getTranslations } from 'next-intl/server';

export default async function PerilicePage({
  params,
  searchParams,
}: {
  params: { locale: string };
  searchParams: { brand?: string };
}) {
  const category = await fetchCategoryByHandle('perilice');
  const brand = searchParams.brand;
  const products = category
    ? await fetchProducts({ 'category_id[]': category.id, 'tags[]': brand }).catch(() => [])
    : [];
  const t = await getTranslations('shop');
  const translate = await getTranslations();

  return (
    <div className="grid gap-8 md:grid-cols-[260px_1fr]">
      <aside className="space-y-6">
        <BrandFilter />
      </aside>
      <section className="space-y-6">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-primary">
            {translate('filters.category.perilice')}
          </h1>
          <p className="text-sm text-muted-foreground">
            TODO: Dodati opis kategorije Perilice iz CMS-a.
          </p>
        </header>
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/50 p-16 text-center">
            <h2 className="text-xl font-semibold text-primary">{t('empty.title')}</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">{t('empty.description')}</p>
            <a
              href={`/${params.locale}/admin`}
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
