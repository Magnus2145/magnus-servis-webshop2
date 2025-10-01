import { getRequestConfig } from 'next-intl/server';

export const locales = ['hr', 'en'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./translations/${locale}.json`)).default,
}));
