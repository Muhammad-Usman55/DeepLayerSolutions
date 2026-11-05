import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <main id="main-content" tabIndex={-1} className={cn("flex-1 w-full outline-none", className)}>
      {children}
    </main>
  );
}

