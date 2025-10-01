const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:9000';

async function apiFetch<T>(path: string, init?: RequestInit) {
  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Medusa request failed: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as T;
}

export type MedusaProduct = {
  id: string;
  title: string;
  thumbnail?: string | null;
  handle?: string | null;
};

export type MedusaCategory = { id: string; name: string; handle: string };

export async function fetchProducts(params: Record<string, string | number | undefined> = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      if (Array.isArray(value)) {
        value.forEach((item) => search.append(key, String(item)));
      } else {
        search.append(key, String(value));
      }
    }
  });
  const query = search.toString() ? `?${search.toString()}` : '';
  const data = await apiFetch<{ products: MedusaProduct[] }>(`/store/products${query}`);
  return data.products;
}

export async function fetchCategories() {
  const data = await apiFetch<{ product_categories: MedusaCategory[] }>(
    '/store/product-categories',
  );
  return data.product_categories;
}

export async function fetchCategoryByHandle(handle: string) {
  const data = await apiFetch<{ product_categories: MedusaCategory[] }>(
    `/store/product-categories?handle=${handle}`,
  );
  return data.product_categories[0] ?? null;
}

export async function fetchBrands() {
  const data = await apiFetch<{ product_tags: { id: string; value: string }[] }>(
    '/store/product-tags',
  );
  return data.product_tags;
}
