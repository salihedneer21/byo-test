import { createAuthClient } from "better-auth/react";
import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { emailOTPClient, twoFactorClient } from "better-auth/client/plugins";
// Remove only the credential caches left by the retired custom auth plugin.
// Never read or migrate their contents into the cookie-managed session.
if (typeof window !== "undefined") {
  try {
    window.localStorage.removeItem("better-auth_cookie");
    window.localStorage.removeItem("better-auth_session_data");
  } catch {
    // Storage can be unavailable; authentication does not depend on it.
  }
}

// Derive the Convex site URL from the cloud URL
// e.g., https://abc-123.convex.cloud -> https://abc-123.convex.site
// For local deployments, use VITE_CONVEX_SITE_URL directly (set in .env.local)
const convexUrl = import.meta.env.VITE_CONVEX_URL as string;
const convexSiteUrl = (import.meta.env.VITE_CONVEX_SITE_URL as string) || convexUrl?.replace(".convex.cloud", ".convex.site");

export const authClient = createAuthClient({
  baseURL: convexSiteUrl,
  plugins: [
    convexClient(),
    emailOTPClient(),
    twoFactorClient(),
  ],
  // Better Auth sends browser-managed HttpOnly cookies, not copied headers.
  fetchOptions: {
    credentials: "include",
  },
  sessionOptions: {
    refetchOnWindowFocus: false,
    refetchInterval: 0,
  },
});

// Better Auth can flip claims such as twoFactorEnabled without rotating the
// session token. Force a fresh getSession call so protected routes see the
// updated state before navigating.
export async function refreshAuthSession() {
  await authClient.getSession();
  authClient.$store.notify("$sessionSignal");
}
