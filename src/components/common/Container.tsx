import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg" | "wide";
}

export function Container({ children, className, size = "default" }: ContainerProps) {
  const sizeClasses = {
    sm: "max-w-4xl",
    default: "max-w-7xl",
    lg: "max-w-[1360px]",
    wide: "max-w-[1480px]",
  };

  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeClasses[size], className)}>
      {children}
    </div>
  );
}

