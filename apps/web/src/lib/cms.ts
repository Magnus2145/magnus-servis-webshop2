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

type StrapiSingleResponse<T> = {
  data: { id: number; attributes: T } | null;
};

type StrapiMedia = {
  data?: {
    id: number;
    attributes: {
      url: string;
      alternativeText?: string | null;
      width?: number | null;
      height?: number | null;
    };
  } | null;
};

export type CmsImage = {
  url: string;
  alternativeText?: string | null;
  width?: number | null;
  height?: number | null;
};

function resolveMedia(media?: StrapiMedia | null): CmsImage | null {
  if (!media?.data?.attributes?.url) {
    return null;
  }

  const { url, alternativeText, width, height } = media.data.attributes;
  const absoluteUrl = url.startsWith('http') ? url : `${cmsBaseUrl}${url}`;
  return {
    url: absoluteUrl,
    alternativeText: alternativeText ?? null,
    width: width ?? null,
    height: height ?? null,
  };
}

export type CmsLink = {
  label: string;
  href: string;
  description?: string | null;
  openInNewTab?: boolean;
};

type StrapiLink = CmsLink & { id?: number };

type StrapiNavigationItem = {
  id?: number;
  label: string;
  href: string;
  highlight?: boolean;
  openInNewTab?: boolean;
  children?: StrapiLink[];
};

export type CmsNavigationItem = StrapiNavigationItem & {
  children?: CmsLink[];
};

export type CmsFeature = {
  title: string;
  description?: string | null;
  icon?: string | null;
};

export type CmsHeroSection = {
  type: 'hero';
  eyebrow?: string | null;
  title: string;
  subtitle?: string | null;
  layout: 'split' | 'center';
  backgroundStyle: 'light' | 'dark' | 'gradient' | 'image';
  backgroundImage?: CmsImage | null;
  primaryCtaLabel?: string | null;
  primaryCtaHref?: string | null;
  secondaryCtaLabel?: string | null;
  secondaryCtaHref?: string | null;
};

export type CmsRichTextSection = {
  type: 'rich-text';
  title?: string | null;
  body?: string | null;
};

export type CmsFeatureGridSection = {
  type: 'feature-grid';
  title?: string | null;
  subtitle?: string | null;
  columns: number;
  features: CmsFeature[];
};

export type CmsMediaHighlightSection = {
  type: 'media-highlight';
  title?: string | null;
  body?: string | null;
  mediaPosition: 'left' | 'right';
  image?: CmsImage | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
};

export type CmsCallToActionSection = {
  type: 'call-to-action';
  title: string;
  body?: string | null;
  tone: 'primary' | 'secondary' | 'muted' | 'dark';
  ctaLabel?: string | null;
  ctaHref?: string | null;
};

export type CmsContactItem = {
  label?: string | null;
  value?: string | null;
  icon?: string | null;
};

export type CmsContactBlockSection = {
  type: 'contact-block';
  title?: string | null;
  description?: string | null;
  showForm: boolean;
  mapEmbedUrl?: string | null;
  contactItems: CmsContactItem[];
};

export type CmsLinkGridSection = {
  type: 'link-grid';
  title?: string | null;
  description?: string | null;
  links: CmsLink[];
};

export type CmsSection =
  | CmsHeroSection
  | CmsRichTextSection
  | CmsFeatureGridSection
  | CmsMediaHighlightSection
  | CmsCallToActionSection
  | CmsContactBlockSection
  | CmsLinkGridSection;

type PageAttributes = {
  title: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  sections?: Array<{ __component: string } & Record<string, any>>;
};

export type CmsPage = {
  title: string;
  seoTitle?: string | null;
  seoDescription?: string | null;
  sections: CmsSection[];
};

function mapLink(link?: StrapiLink | null): CmsLink | null {
  if (!link?.label || !link.href) {
    return null;
  }
  return {
    label: link.label,
    href: link.href,
    description: link.description ?? null,
    openInNewTab: link.openInNewTab ?? false,
  };
}

function mapNavigationItem(item?: StrapiNavigationItem | null): CmsNavigationItem | null {
  if (!item?.label || !item.href) {
    return null;
  }

  return {
    label: item.label,
    href: item.href,
    highlight: item.highlight ?? false,
    openInNewTab: item.openInNewTab ?? false,
    children: (item.children ?? [])
      .map((child) => mapLink(child))
      .filter((link): link is CmsLink => Boolean(link)),
  };
}

function mapSection(section: { __component: string } & Record<string, any>): CmsSection | null {
  switch (section.__component) {
    case 'sections.hero-section':
      return {
        type: 'hero',
        eyebrow: section.eyebrow ?? null,
        title: section.title ?? 'TODO: Dodati naslov',
        subtitle: section.subtitle ?? null,
        layout: section.layout ?? 'split',
        backgroundStyle: section.backgroundStyle ?? 'gradient',
        backgroundImage: resolveMedia(section.backgroundImage as StrapiMedia | undefined),
        primaryCtaLabel: section.primaryCtaLabel ?? null,
        primaryCtaHref: section.primaryCtaHref ?? null,
        secondaryCtaLabel: section.secondaryCtaLabel ?? null,
        secondaryCtaHref: section.secondaryCtaHref ?? null,
      };
    case 'sections.rich-text':
      return {
        type: 'rich-text',
        title: section.title ?? null,
        body: section.body ?? null,
      };
    case 'sections.feature-grid':
      return {
        type: 'feature-grid',
        title: section.title ?? null,
        subtitle: section.subtitle ?? null,
        columns: typeof section.columns === 'number' ? section.columns : 3,
        features: (section.features ?? [])
          .map((feature: CmsFeature) => ({
            title: feature.title ?? 'TODO: Dodati naslov',
            description: feature.description ?? null,
            icon: feature.icon ?? null,
          }))
          .filter((feature) => Boolean(feature.title)),
      };
    case 'sections.media-highlight':
      return {
        type: 'media-highlight',
        title: section.title ?? null,
        body: section.body ?? null,
        mediaPosition: section.mediaPosition === 'left' ? 'left' : 'right',
        image: resolveMedia(section.image as StrapiMedia | undefined),
        ctaLabel: section.ctaLabel ?? null,
        ctaHref: section.ctaHref ?? null,
      };
    case 'sections.call-to-action':
      return {
        type: 'call-to-action',
        title: section.title ?? 'TODO: Dodati naslov CTA sekcije',
        body: section.body ?? null,
        tone: section.tone ?? 'primary',
        ctaLabel: section.ctaLabel ?? null,
        ctaHref: section.ctaHref ?? null,
      };
    case 'sections.contact-block':
      return {
        type: 'contact-block',
        title: section.title ?? null,
        description: section.description ?? null,
        showForm: section.showForm ?? false,
        mapEmbedUrl: section.mapEmbedUrl ?? null,
        contactItems: (section.contactItems ?? []).map((item: CmsContactItem) => ({
          label: item.label ?? null,
          value: item.value ?? null,
          icon: item.icon ?? null,
        })),
      };
    case 'sections.link-grid':
      return {
        type: 'link-grid',
        title: section.title ?? null,
        description: section.description ?? null,
        links: (section.links ?? [])
          .map((link: StrapiLink) => mapLink(link))
          .filter((link): link is CmsLink => Boolean(link)),
      };
    default:
      return null;
  }
}

export async function fetchPageBySlug(slug: string, locale: string): Promise<CmsPage | null> {
  try {
    const response = await cmsFetch<StrapiCollectionResponse<PageAttributes>>(
      `/api/pages?filters[slug][$eq]=${slug}&locale=${locale}&populate=deep`
    );

    const attributes = response.data[0]?.attributes;
    if (!attributes) {
      return null;
    }

    const sections = (attributes.sections ?? [])
      .map((section) => mapSection(section))
      .filter((section): section is CmsSection => Boolean(section));

    return {
      title: attributes.title,
      seoTitle: attributes.seoTitle ?? null,
      seoDescription: attributes.seoDescription ?? null,
      sections,
    };
  } catch (error) {
    console.warn('Failed to fetch CMS page %s: %s', slug, (error as Error).message);
    return null;
  }
}

export type CmsFooterColumn = {
  title?: string | null;
  links: CmsLink[];
};

export type CmsSocialLink = {
  platform: string;
  label?: string | null;
  url?: string | null;
};

export type GlobalTheme = {
  primaryColor?: string | null;
  primaryOnColor?: string | null;
  secondaryColor?: string | null;
  secondaryOnColor?: string | null;
  accentColor?: string | null;
  accentOnColor?: string | null;
  backgroundColor?: string | null;
  foregroundColor?: string | null;
};

type GlobalAttributes = {
  siteName: string;
  tagline?: string | null;
  navigation?: StrapiNavigationItem[];
  footerColumns?: Array<{ title?: string | null; links?: StrapiLink[] }>;
  socialLinks?: CmsSocialLink[];
  contactEmail?: string | null;
  contactPhone?: string | null;
  address?: string | null;
  logo?: StrapiMedia;
  favicon?: StrapiMedia;
  primaryColor?: string | null;
  primaryOnColor?: string | null;
  secondaryColor?: string | null;
  secondaryOnColor?: string | null;
  accentColor?: string | null;
  accentOnColor?: string | null;
  backgroundColor?: string | null;
  foregroundColor?: string | null;
};

export type GlobalSettings = {
  siteName: string;
  tagline?: string | null;
  navigation: CmsNavigationItem[];
  footerColumns: CmsFooterColumn[];
  socialLinks: CmsSocialLink[];
  contactEmail?: string | null;
  contactPhone?: string | null;
  address?: string | null;
  logo?: CmsImage | null;
  favicon?: CmsImage | null;
  theme: GlobalTheme;
};

export async function fetchGlobalSettings(locale: string): Promise<GlobalSettings | null> {
  try {
    const response = await cmsFetch<StrapiSingleResponse<GlobalAttributes>>(
      `/api/global?locale=${locale}&populate=deep`
    );

    const attributes = response.data?.attributes;
    if (!attributes) {
      return null;
    }

    return {
      siteName: attributes.siteName,
      tagline: attributes.tagline ?? null,
      navigation: (attributes.navigation ?? [])
        .map((item) => mapNavigationItem(item))
        .filter((item): item is CmsNavigationItem => Boolean(item)),
      footerColumns: (attributes.footerColumns ?? []).map((column) => ({
        title: column.title ?? null,
        links: (column.links ?? [])
          .map((link) => mapLink(link))
          .filter((link): link is CmsLink => Boolean(link)),
      })),
      socialLinks: attributes.socialLinks ?? [],
      contactEmail: attributes.contactEmail ?? null,
      contactPhone: attributes.contactPhone ?? null,
      address: attributes.address ?? null,
      logo: resolveMedia(attributes.logo),
      favicon: resolveMedia(attributes.favicon),
      theme: {
        primaryColor: attributes.primaryColor ?? null,
        primaryOnColor: attributes.primaryOnColor ?? null,
        secondaryColor: attributes.secondaryColor ?? null,
        secondaryOnColor: attributes.secondaryOnColor ?? null,
        accentColor: attributes.accentColor ?? null,
        accentOnColor: attributes.accentOnColor ?? null,
        backgroundColor: attributes.backgroundColor ?? null,
        foregroundColor: attributes.foregroundColor ?? null,
      },
    };
  } catch (error) {
    console.warn('Failed to fetch CMS global settings: %s', (error as Error).message);
    return null;
  }
}
