import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/src/i18n/request';
import { SiteHeader } from '@/src/components/site-header';
import { SiteFooter } from '@/src/components/site-footer';
import { Providers } from '@/src/components/providers';
import { fetchGlobalSettings, GlobalSettings } from '@/src/lib/cms';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const themeFallback = {
  primaryColor: '#0B2545',
  primaryOnColor: '#FFFFFF',
  secondaryColor: '#3E92CC',
  secondaryOnColor: '#FFFFFF',
  accentColor: '#F9C80E',
  accentOnColor: '#0B2545',
  backgroundColor: '#FFFFFF',
  foregroundColor: '#0F172A',
};

const emptyGlobal: GlobalSettings = {
  siteName: 'Magnus Servis',
  tagline: 'TODO: Uredi sadržaj u CMS-u.',
  navigation: [],
  footerColumns: [],
  socialLinks: [],
  contactEmail: null,
  contactPhone: null,
  address: null,
  logo: null,
  favicon: null,
  theme: themeFallback,
};

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
  const globalSettings = (await fetchGlobalSettings(locale)) ?? emptyGlobal;
  const theme = {
    primaryColor: globalSettings.theme.primaryColor ?? themeFallback.primaryColor,
    primaryOnColor: globalSettings.theme.primaryOnColor ?? themeFallback.primaryOnColor,
    secondaryColor: globalSettings.theme.secondaryColor ?? themeFallback.secondaryColor,
    secondaryOnColor: globalSettings.theme.secondaryOnColor ?? themeFallback.secondaryOnColor,
    accentColor: globalSettings.theme.accentColor ?? themeFallback.accentColor,
    accentOnColor: globalSettings.theme.accentOnColor ?? themeFallback.accentOnColor,
    backgroundColor: globalSettings.theme.backgroundColor ?? themeFallback.backgroundColor,
    foregroundColor: globalSettings.theme.foregroundColor ?? themeFallback.foregroundColor,
  };

  const themeVariables: Record<string, string> = {
    '--brand-primary': theme.primaryColor,
    '--brand-on-primary': theme.primaryOnColor,
    '--brand-secondary': theme.secondaryColor,
    '--brand-on-secondary': theme.secondaryOnColor,
    '--brand-accent': theme.accentColor,
    '--brand-on-accent': theme.accentOnColor,
    '--background': theme.backgroundColor,
    '--foreground': theme.foregroundColor,
  };

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-background text-foreground" style={themeVariables}>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <SiteHeader locale={locale} global={globalSettings} />
            <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
            <SiteFooter locale={locale} global={globalSettings} />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
