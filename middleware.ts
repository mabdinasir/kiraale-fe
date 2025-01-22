import decodeAuthToken from '@utils/decodeJwt'
import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware({
    locales: ['en', 'so'],
    defaultLocale: 'en',
})

const protectedRoutes = ['/profile']

export default function middleware(request: NextRequest) {
    const token = request.cookies.get('authToken')?.value || null
    const user = decodeAuthToken(token as string)
    const { isSignedIn } = user || {}
    const { pathname } = request.nextUrl
    const locale = pathname.split('/')[1]
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(`/${locale}${route}`))

    if (isSignedIn && pathname.startsWith(`/${locale}/auth`)) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (isProtectedRoute && !isSignedIn) {
        return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.nextUrl))
    }

    return intlMiddleware(request)
}

export const config = {
    matcher: ['/', '/(en|so)/:path*', '/auth/:path*', '/profile/:path*'],
}
