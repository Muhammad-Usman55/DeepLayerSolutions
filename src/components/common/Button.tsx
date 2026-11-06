import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
  withArrow?: boolean;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      href,
      withArrow = false,
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#008F53] focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-6 py-3.5 gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-[#008F53] text-white hover:bg-[#007343] shadow-sm hover:shadow-md hover:shadow-[#008F53]/20 border border-transparent",
      secondary:
        "bg-[#E9FFF2] text-[#008F53] hover:bg-[#D5F9E6] border border-[#DFEDE5]",
      outline:
        "bg-transparent text-[#142A27] border border-[#DFEDE5] hover:border-[#008F53] hover:text-[#008F53] hover:bg-[#E9FFF2]/60",
      ghost:
        "bg-transparent text-[#142A27] hover:text-[#008F53] hover:bg-[#E9FFF2]/60",
      dark:
        "bg-[#142A27] text-white hover:bg-[#075B3E] border border-transparent shadow-sm",
      white:
        "bg-white text-[#008F53] hover:bg-[#E9FFF2]/60 shadow-md border border-white/40",
    };

    const content = (
      <>
        {isLoading && (
          <span className="inline-block w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        <span>{children}</span>
        {withArrow && !isLoading && (
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        )}
      </>
    );

    if (href) {
      const isAnchorDisabled = disabled || isLoading;
      return (
        <Link
          href={isAnchorDisabled ? "#" : href}
          aria-disabled={isAnchorDisabled ? "true" : undefined}
          tabIndex={isAnchorDisabled ? -1 : undefined}
          className={cn(baseStyles, sizeStyles[size], variantStyles[variant], "group", className)}
        >
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], "group", className)}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

