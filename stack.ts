import "server-only";

import { StackServerApp } from "@stackframe/stack";

function readEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

export function isStackConfigured(): boolean {
  return Boolean(
    readEnv("NEXT_PUBLIC_STACK_PROJECT_ID") &&
      readEnv("NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY") &&
      readEnv("STACK_SECRET_SERVER_KEY"),
  );
}

function createStackServerApp() {
  return new StackServerApp({
    tokenStore: "nextjs-cookie",
    noAutomaticPrefetch: true,
    analytics: { enabled: false },
    urls: {
      afterSignIn: "/admin/articles",
      afterSignUp: "/admin/articles",
      afterSignOut: "/",
    },
  });
}

let stackServerApp: ReturnType<typeof createStackServerApp> | undefined;

export function getStackServerApp() {
  if (!isStackConfigured()) {
    throw new Error("Stack Auth n'est pas configuré.");
  }
  stackServerApp ??= createStackServerApp();
  return stackServerApp;
}
