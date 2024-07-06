export { default } from "next-auth/middleware";

export const config = {
  // Example matcher for protected routes
  matcher: [
    // "/user/:path*", // Matches /dashboard and any subsequent paths
    // "/room/:path*", // Matches /profile and any subsequent paths
    // "/browse",
  ],
};
