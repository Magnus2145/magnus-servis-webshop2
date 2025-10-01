import createMiddleware from 'next-intl/middleware';
import { locales } from './src/i18n/request';

export default createMiddleware({
  locales,
  defaultLocale: 'hr',
  localePrefix: 'always',
});

export const config = {
  matcher: ['/', '/(hr|en)/:path*'],
};
