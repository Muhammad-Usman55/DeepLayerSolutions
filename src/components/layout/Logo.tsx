import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "default" | "navbar" | "footer" | "icon-only" | "light";
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, variant = "default", size = "md" }: LogoProps) {
  const isLight = variant === "light" || variant === "footer";
  const isIconOnly = variant === "icon-only";

  const sizeMap = {
    sm: { img: 28, height: 28, width: 28, textClass: "text-sm", subClass: "text-[9px]" },
    md: { img: 34, height: 34, width: 34, textClass: "text-[18px]", subClass: "text-[10.5px]" },
    lg: { img: 52, height: 52, width: 52, textClass: "text-2xl", subClass: "text-sm" },
  };

  const { img, textClass, subClass } = sizeMap[size];

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#047F5B] rounded-lg",
        className
      )}
      aria-label="DeepLayer Solutions Home"
    >
      <div className="relative shrink-0 flex items-center justify-center">
        <Image
          src="/logo/logo-cropped.png"
          alt="DeepLayer Solutions"
          width={img}
          height={img}
          priority
          style={{ width: "auto", height: "auto" }}
          className="object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
        />
      </div>

      {!isIconOnly && (
        <div className="flex flex-col leading-tight select-none">
          <div className="flex items-center">
            <span
              className={cn(
                "font-extrabold tracking-tight",
                textClass,
                isLight ? "text-white" : "text-[#101C19]"
              )}
            >
              DeepLayer
            </span>
          </div>
          <span
            className={cn(
              "font-semibold tracking-[0.16em] uppercase -mt-0.5",
              subClass,
              isLight ? "text-[#34D399]" : "text-[#047F5B]"
            )}
          >
            Solutions
          </span>
        </div>
      )}
    </Link>
  );
}
