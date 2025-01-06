import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;

  // Redirect to login if no token exists
  if (!token) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  try {
    // Decode the token to extract user role and expiration
    const payload = JSON.parse(atob(token.split('.')[1])); // Decoding JWT payload (base64)
    const { role, exp } = payload;

    // Check if the token has expired
    if (Date.now() >= exp * 1000) {
      return NextResponse.redirect(new URL('/auth/sign-in', req.url));
    }

    // Redirect based on user role
    if (role === 'TEACHER' && !req.nextUrl.pathname.startsWith('/in/teacher')) {
      return NextResponse.redirect(new URL('/in/teacher', req.url));
    }

    if (role === 'STUDENT' && !req.nextUrl.pathname.startsWith('/in/student')) {
      return NextResponse.redirect(new URL('/in/student', req.url));
    }
  } catch (error) {
    // If token decoding fails or payload is invalid, redirect to login
    console.error('Token validation error:', error);
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  // Allow the request if all checks pass
  return NextResponse.next();
}

export const config = {
  matcher: ['/in/:path*'], // Match all routes under /in/
};
