import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if the request is for a protected route
  const isProtectedRoute =
    [
      "/dashboard",
      "/profile",
      "/settings",
      "/calculator",
      "/recipes",
      "/shop",
    ].some((path) => req.nextUrl.pathname.startsWith(path)) ||
    // Protect all routes except explicitly public ones
    (!req.nextUrl.pathname.startsWith("/_next") &&
      !req.nextUrl.pathname.startsWith("/api") &&
      !req.nextUrl.pathname.startsWith("/login") &&
      !req.nextUrl.pathname.startsWith("/reset-password") &&
      req.nextUrl.pathname !== "/" &&
      req.nextUrl.pathname !== "/pricing");

  // Check if the request is for admin route
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  if (isProtectedRoute && !session) {
    // Redirect to login if trying to access protected route without session
    const redirectUrl = new URL("/login", req.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAdminRoute) {
    if (!session) {
      // Redirect to login if trying to access admin route without session
      const redirectUrl = new URL("/login", req.url);
      return NextResponse.redirect(redirectUrl);
    }

    // Check if user is admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", session.user.id)
      .single();

    if (!profile?.is_admin) {
      // Redirect to dashboard if user is not an admin
      const redirectUrl = new URL("/dashboard", req.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
