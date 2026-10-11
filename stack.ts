import "server-only";

import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  noAutomaticPrefetch: true,
  analytics: { enabled: false },
  urls: {
    afterSignIn: "/admin/articles",
    afterSignUp: "/admin/articles",
    afterSignOut: "/",
  },
});
