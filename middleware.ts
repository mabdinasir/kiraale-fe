import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
    locales: ['en', 'so', 'sw'],
    defaultLocale: 'en',
})

export const config = {
    matcher: ['/', '/(en|so|sw)/:path*'],
}
