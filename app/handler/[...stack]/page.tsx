import { StackHandler } from "@stackframe/stack";
import { Suspense } from "react";

import { stackServerApp } from "@/stack";

export default function Handler(props: unknown) {
  return (
    <Suspense fallback={null}>
      <StackHandler fullPage app={stackServerApp} routeProps={props} />
    </Suspense>
  );
}
