import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { config as addConfig } from "./app/config";
import next from "next";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not set in environment variables");
  }
  return new TextEncoder().encode(secret);
}

async function validateToken(token: string): Promise<boolean> {
  try {
    const isValid = await jwtVerify(token, getJwtSecret(), {
      algorithms: ["HS256"],
    });
    return true;
  } catch (error) {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  // Prevent middleware from running on certain paths to avoid loops
  const bypassRoutes = [
    "/login",
    "/_next/static",
    "/_next/image",
    "/favicon.ico",
  ];
  if (
    bypassRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return NextResponse.next();
  }

  // Check if this is already a redirect from token refresh
  // const isTokenRefreshRedirect =
  //   request.cookies.get("token_refresh_redirect")?.value === "true";

  // Protected routes
  const protectedRoutes = ["/dashboard", "/menu-genstande", "/orders"];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // If not a protected route, continue
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Get tokens from cookies
  const accessToken = request.cookies.get("accessToken")?.value;
  console.log("🚀 ~ middleware ~ accessToken:", accessToken);
  const refreshToken = request.cookies.get("refreshToken")?.value;
  console.log("🚀 ~ middleware ~ refreshToken:", refreshToken);

  // If no tokens, redirect to login
  if (!refreshToken) {
    console.error("No tokens found");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check if access token is valid
  const isAccessTokenValid = accessToken
    ? await validateToken(accessToken)
    : false;
  console.log(
    "🚀 ~ middleware ~ isAccessTokenValid:",
    isAccessTokenValid,
    new Date()
  );

  // If access token is valid, continue
  if (isAccessTokenValid) {
    return NextResponse.next();
  }
  console.error("Access token not valid");

  // Prevent infinite redirect loop
  // if (isTokenRefreshRedirect) {
  //   console.error("Infinite redirect loop detected");
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // If access token is invalid, attempt to refresh
  try {
    const accessTokenResponse = await fetch(
      `${addConfig.backendUrl}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: refreshToken }),
        cache: "no-store",
      }
    );
    console.log("🚀 ~ middleware ~ accessTokenResponse:", accessTokenResponse);

    // If refresh fails, redirect to login
    if (!accessTokenResponse.ok) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      return response;
    }

    // Parse new tokens
    const { accessToken: newAccessToken } = await accessTokenResponse.json();
    console.log("🚀 ~ middleware ~ newAccessToken:", newAccessToken);

    // Create a response to set new cookies
    const response = NextResponse.next();

    // Set new access token
    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // Exists 1 day but will just expire after 1 hour
    });

    // Add a flag to prevent infinite redirects
    response.cookies.set("token_refresh_redirect", "true", {
      path: "/",
      maxAge: 10, // Short-lived cookie
    });

    //
    return response;
  } catch (error) {
    // Any network or parsing errors
    console.error("Token refresh error:", error);

    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/menu-genstande/:path*", "/orders/:path*"],
};
