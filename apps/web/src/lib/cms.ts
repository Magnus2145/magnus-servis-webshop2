const cmsBaseUrl = process.env.NEXT_PUBLIC_CMS_URL ?? 'http://localhost:1337';

async function cmsFetch<T>(path: string, init?: RequestInit) {
  const res = await fetch(`${cmsBaseUrl}${path}`, {
    ...init,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`CMS request failed: ${res.status}`);
  }

  return (await res.json()) as T;
}

type StrapiCollectionResponse<T> = {
  data: { id: number; attributes: T }[];
};

type PageAttributes = {
  title: string;
  slug: string;
  content: string;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  heroCtaLabel?: string | null;
};

export async function fetchPageBySlug(slug: string) {
  try {
    const response = await cmsFetch<StrapiCollectionResponse<PageAttributes>>(
      `/api/pages?filters[slug][$eq]=${slug}&populate=deep`,
    );
    return response.data[0]?.attributes ?? null;
  } catch (error) {
    console.warn('Failed to fetch CMS page %s: %s', slug, (error as Error).message);
    return null;
  }
}
