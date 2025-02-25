import { withClerkMiddleware } from "@clerk/nextjs";

export default withClerkMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"],
  ignoredRoutes: ["/api/webhooks/clerk"],
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", // Match all paths except static files
    "/", // Match root path
    "/(api|trpc)(.*)", // Match API routes
  ],
};
