'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { GlobalSettings } from '@/src/lib/cms';
import { resolveHref } from '@/src/components/cms/utils';
import { cn } from '@magnus/ui';

type HeaderProps = {
  locale: string;
  global: GlobalSettings;
};

type NormalizedNavItem = {
  label: string;
  href: string;
  external: boolean;
  highlight?: boolean;
  children?: NormalizedNavItem[];
};

function normalizeNav(global: GlobalSettings, locale: string): NormalizedNavItem[] {
  const items = global.navigation.length > 0 ? global.navigation : [];

  const normalized = items
    .map((item) => {
      const href = resolveHref(item.href, locale);
      if (!href) {
        return null;
      }

      return {
        label: item.label,
        href: href.href,
        external: href.external,
        highlight: item.highlight,
        children: (item.children ?? [])
          .map((child) => {
            const childHref = resolveHref(child.href, locale);
            if (!childHref) {
              return null;
            }
            return {
              label: child.label,
              href: childHref.href,
              external: childHref.external,
            } as NormalizedNavItem;
          })
          .filter((child): child is NormalizedNavItem => Boolean(child)),
      } as NormalizedNavItem;
    })
    .filter((item): item is NormalizedNavItem => Boolean(item));

  if (normalized.length > 0) {
    return normalized;
  }

  return [
    { label: locale === 'en' ? 'Home' : 'Početna', href: `/${locale}`, external: false },
    { label: locale === 'en' ? 'Service' : 'Servis', href: `/${locale}/servis`, external: false },
    { label: locale === 'en' ? 'Services' : 'Usluge', href: `/${locale}/usluge`, external: false },
    { label: locale === 'en' ? 'Store' : 'Trgovina', href: `/${locale}/trgovina`, external: false },
    { label: locale === 'en' ? 'Contact' : 'Kontakt', href: `/${locale}/kontakt`, external: false },
  ];
}

export function SiteHeader({ locale, global }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const items = useMemo(() => normalizeNav(global, locale), [global, locale]);
  const logo = global.logo;
  const pathname = usePathname();

  const closeMenu = () => setOpen(false);

  return (
    <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={`/${locale}`} className="flex items-center gap-3 text-lg font-semibold text-primary" onClick={closeMenu}>
          {logo ? (
            <Image
              src={logo.url}
              alt={logo.alternativeText ?? global.siteName}
              width={120}
              height={48}
              className="h-10 w-auto object-contain"
            />
          ) : (
            <span>{global.siteName}</span>
          )}
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {items.map((item) => (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer noopener' : undefined}
                className={cn(
                  'transition-colors hover:text-primary',
                  item.external
                    ? 'text-muted-foreground'
                    : pathname?.startsWith(item.href)
                    ? 'text-primary'
                    : item.highlight
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
              {item.children && item.children.length > 0 && (
                <div className="absolute left-0 mt-2 hidden w-48 flex-col rounded-md border bg-white shadow-lg group-hover:flex">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      target={child.external ? '_blank' : undefined}
                      rel={child.external ? 'noreferrer noopener' : undefined}
                      className="px-4 py-2 text-sm text-muted-foreground transition hover:text-primary"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <button
          className="inline-flex items-center justify-center rounded-md border border-border p-2 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={open ? 'Zatvori navigaciju' : 'Otvori navigaciju'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t bg-white p-4 md:hidden">
          <nav className="flex flex-col space-y-3 text-sm">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer noopener' : undefined}
                className={cn(
                  'font-medium',
                  item.external
                    ? 'text-muted-foreground'
                    : pathname?.startsWith(item.href)
                    ? 'text-primary'
                    : item.highlight
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
