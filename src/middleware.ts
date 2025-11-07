import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar'],

  // Used when no locale matches
  defaultLocale: 'en',

  // The `localePrefix` strategy enables prefix-based routing for all locales
  // except for the default locale.
  localePrefix: 'as-needed',
  localeDetection: false
});

export const config = {
  // Match only internationalized pathnames
  // Exclude: api routes, Next.js internals, static files, and images
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|logos|videos|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|mp4)).*)']
};
