import { Role } from '@models/user'
import decodeAuthToken from '@utils/decodeJwt'
import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware({
    locales: ['en', 'so'],
    defaultLocale: 'en',
})

// Define all base protected route prefixes
const protectedRoutePrefixes = ['/dashboard', '/admin']

export default function middleware(request: NextRequest) {
    const token = request.cookies.get('authToken')?.value || null
    const currentUser = decodeAuthToken(token as string)
    const { isSignedIn } = currentUser || {}
    const { pathname } = request.nextUrl

    // Extract locale from the path
    const locale = pathname.split('/')[1]

    // Check if the current route matches any protected route prefix
    const isProtectedRoute = protectedRoutePrefixes.some((prefix) => pathname.startsWith(`/${locale}${prefix}`))

    // Redirect signed-in users away from auth pages
    if (isSignedIn && pathname.startsWith(`/${locale}/auth`)) {
        return NextResponse.redirect(new URL(`/${locale}`, request.url))
    }

    // Redirect unauthenticated users to the login page
    if (isProtectedRoute && !isSignedIn) {
        return NextResponse.redirect(new URL(`/${locale}/auth/login`, request.url))
    }

    // if user is not moderator or admin and trying to access admin page, redirect to /
    if (isSignedIn && pathname.startsWith(`/${locale}/admin`)) {
        if (!(currentUser?.role === Role.MODERATOR || currentUser?.role === Role.ADMIN)) {
            return NextResponse.redirect(new URL(`/${locale}`, request.url))
        }
    }

    return intlMiddleware(request)
}

export const config = {
    matcher: ['/', '/(en|so)/:path*', '/auth/:path*', '/profile/:path*', '/dashboard/:path*', '/admin/:path*'],
}
