import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value;

  // Redirect to login if no token exists
  if (!token) {
    return NextResponse.redirect(new URL('/auth/sign-in', req.url));
  }

  // Allow the request if token exists
  return NextResponse.next();
}

export const config = {
  matcher: ['/in/:path*'], // Match all routes under /in/
};
