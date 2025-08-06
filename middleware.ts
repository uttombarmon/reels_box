// export { auth as middleware } from "@/lib/auth";
// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Check for an auth token or session cookie.
  const token = request.cookies.get("auth_token");

  // If no token, redirect to the login page.
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If a token exists, allow the request to proceed.
  return NextResponse.next();
}

// Apply this middleware only to a specific path.
export const config = {
  matcher: ["/dashboard/:path*"],
};
