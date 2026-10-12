import { StackHandler } from "@stackframe/stack";
import { Suspense } from "react";

import { getStackServerApp, isStackConfigured } from "@/stack";

export default function Handler(props: unknown) {
  if (!isStackConfigured()) {
    return (
      <p className="mx-auto w-full max-w-6xl px-4 py-10 text-sm text-muted-foreground lg:px-6">
        L&apos;authentification n&apos;est pas configurée.
      </p>
    );
  }

  return (
    <Suspense fallback={null}>
      <StackHandler fullPage app={getStackServerApp()} routeProps={props} />
    </Suspense>
  );
}
