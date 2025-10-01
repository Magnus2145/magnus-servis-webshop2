'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { mainNav } from '@/src/data/navigation';
import { cn } from '@magnus/ui';
import { useMemo, useState } from 'react';
import { Menu, X } from 'lucide-react';

export function SiteHeader({ locale }: { locale: string }) {
  const t = useTranslations();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = useMemo(
    () =>
      mainNav.map((item) => ({
        ...item,
        href: `/${locale}${item.href === '/' ? '' : item.href}`,
        children: item.children?.map((child) => ({
          ...child,
          href: `/${locale}${child.href}`,
        })),
      })),
    [locale],
  );

  return (
    <header className="border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href={`/${locale}`} className="text-lg font-semibold text-primary">
          Magnus Servis
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {items.map((item) => (
            <div key={item.href} className="relative group">
              <Link
                href={item.href}
                className={cn(
                  'transition-colors hover:text-primary',
                  pathname === item.href || pathname?.startsWith(`${item.href}/`)
                    ? 'text-primary'
                    : 'text-muted-foreground',
                )}
              >
                {t(item.key)}
              </Link>
              {item.children && (
                <div className="absolute left-0 mt-2 hidden w-44 flex-col rounded-md border bg-white shadow-lg group-hover:flex">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="px-4 py-2 text-sm text-muted-foreground hover:text-primary"
                    >
                      {t(child.key)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href={`/${locale}/admin`}
            className="rounded-md border border-primary/30 px-3 py-1 text-sm text-primary"
          >
            {t('nav.admin')}
          </Link>
        </nav>
        <button
          className="inline-flex items-center justify-center rounded-md border border-border p-2 md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t bg-white p-4 md:hidden">
          <nav className="flex flex-col space-y-3 text-sm">
            {items.map((item) => (
              <Link key={item.href} href={item.href} className="font-medium">
                {t(item.key)}
              </Link>
            ))}
            <Link href={`/${locale}/admin`} className="font-medium text-primary">
              {t('nav.admin')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
