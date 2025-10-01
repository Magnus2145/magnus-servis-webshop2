import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/src/i18n/request';
import { SiteHeader } from '@/src/components/site-header';
import { SiteFooter } from '@/src/components/site-footer';
import { Providers } from '@/src/components/providers';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const locale = params.locale as Locale;

  if (!locales.includes(locale)) {
    notFound();
  }

  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-background text-foreground">
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <SiteHeader locale={locale} />
            <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
            <SiteFooter />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
