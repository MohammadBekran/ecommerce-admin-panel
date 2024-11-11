import { ClerkProvider as CProvider } from "@clerk/nextjs";

import type { TPropsWithChildren } from "@/core/types";

const ClerkProvider = ({ children }: TPropsWithChildren) => {
  return <CProvider>{children}</CProvider>;
};

export default ClerkProvider;
