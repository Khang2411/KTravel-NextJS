import { encodeUrl } from '@/utils/url';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import fetch from 'node-fetch';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const url = new URL(request.url);
    const pathname = url.pathname
    let cookie = request.cookies.get('accessToken')

    if (!cookie) {
        return NextResponse.redirect(new URL(`/?back_to=${encodeUrl(pathname)}`, request.url))
    }
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/profile`, {
        headers: {
            "Authorization": `Bearer ${cookie.value}`
        },
    });
    const profile = await response.json() as any
    const isLoggedIn = Boolean(profile.data)
    const verify = Boolean(profile.data.varify)

    if (isLoggedIn === false) {
        return NextResponse.redirect(new URL(`/?back_to=${encodeUrl(pathname)}`, request.url))
    }
    if (request.nextUrl.pathname.startsWith('/verify-account' || '/verify-account-selfile' || "/checking-verify")) {
        if (verify === true) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
}

export const config = {
    matcher: ['/become-host/:path*', '/hosting/:path*', '/manage-your-space/:path*', '/book/:path*', '/wishlist', '/message/:path*', '/verify-account', '/verify-account-selfile', '/settings-account'],
}