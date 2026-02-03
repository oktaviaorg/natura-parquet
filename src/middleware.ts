import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Supported locales
  locales: ['fr', 'de', 'en'],
  
  // Default locale
  defaultLocale: 'fr',
  
  // Auto-detect locale from browser
  localeDetection: true,
  
  // Locale prefix strategy
  localePrefix: 'always'
});

export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - Static files
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
