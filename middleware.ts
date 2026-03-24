import { NextRequest, NextResponse } from "next/server";

const ROOT_DOMAIN = "philhie.com";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") ?? "";
  const pathname = request.nextUrl.pathname;

  // Extract subdomain (ignore www, localhost, and Vercel preview URLs)
  const isLocalhost = hostname.includes("localhost");
  const isVercelPreview = hostname.includes(".vercel.app");

  let subdomain: string | null = null;

  if (!isLocalhost && !isVercelPreview) {
    const parts = hostname.replace(`:${request.nextUrl.port}`, "").split(".");
    if (parts.length > 2 && parts[0] !== "www") {
      subdomain = parts[0];
    }
  }

  // Rewrite subdomain requests to /subdomains/<subdomain>/...
  if (subdomain) {
    return NextResponse.rewrite(
      new URL(`/subdomains/${subdomain}${pathname}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|icon.svg|apple-icon).*)"],
};
