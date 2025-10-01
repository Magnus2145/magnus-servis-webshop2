'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toggleBrandFilter } from '@/src/lib/filters';

const BRANDS = [
  { value: 'icematic', label: 'Icematic' },
  { value: 'elframo', label: 'Elframo' },
];

export function BrandFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();

  const selected = searchParams.get('brand') ?? '';

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const query = toggleBrandFilter(params, value);
    const url = query ? `${pathname}?${query}` : pathname;
    router.push(url);
  };

  return (
    <div className="space-y-3 rounded-lg border p-4">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
        {t('filters.brand')}
      </h3>
      <div className="flex flex-col space-y-2">
        <button
          onClick={() => handleSelect('')}
          className={`text-left text-sm ${selected === '' ? 'font-semibold text-primary' : 'text-muted-foreground'}`}
        >
          {t('filters.all')}
        </button>
        {BRANDS.map((brand) => (
          <button
            key={brand.value}
            onClick={() => handleSelect(brand.value)}
            className={`text-left text-sm ${
              selected === brand.value ? 'font-semibold text-primary' : 'text-muted-foreground'
            }`}
          >
            {brand.label}
          </button>
        ))}
      </div>
    </div>
  );
}
