import { cn } from '@magnus/ui';

const EXTERNAL_HREF_REGEX = /^(https?:\/\/|mailto:|tel:|ftp:)/i;

export function resolveHref(href: string | null | undefined, locale: string): {
  href: string;
  external: boolean;
} | null {
  if (!href || typeof href !== 'string') {
    return null;
  }

  const trimmed = href.trim();
  if (trimmed.length === 0) {
    return null;
  }

  const external = EXTERNAL_HREF_REGEX.test(trimmed);
  if (external) {
    return { href: trimmed, external: true };
  }

  const normalized = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  let localized = locale ? `/${locale}${normalized}` : normalized;
  localized = localized.replace(/\/{2,}/g, '/');
  if (localized.length > 1 && localized.endsWith('/')) {
    localized = localized.slice(0, -1);
  }
  return { href: localized, external: false };
}

export function buttonToneClasses(tone: 'primary' | 'secondary' | 'muted' | 'dark') {
  switch (tone) {
    case 'secondary':
      return 'bg-secondary text-secondary-foreground hover:bg-secondary/90';
    case 'muted':
      return 'bg-muted text-foreground hover:bg-muted/80';
    case 'dark':
      return 'bg-slate-900 text-white hover:bg-slate-800';
    case 'primary':
    default:
      return 'bg-primary text-primary-foreground hover:bg-primary/90';
  }
}

export { cn };
