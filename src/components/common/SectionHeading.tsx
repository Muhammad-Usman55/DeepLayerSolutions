import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
  titleClassName?: string;
  theme?: "light" | "dark";
  action?: ReactNode;
}

export function SectionHeading({
  badge,
  title,
  highlight,
  subtitle,
  align = "center",
  className,
  titleClassName,
  theme = "light",
  action,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const isRight = align === "right";
  const isDark = theme === "dark";

  // Split title if highlight is provided
  let titleParts: { before: string; highlighted: string; after: string } | null = null;
  if (highlight && title.includes(highlight)) {
    const [before, ...rest] = title.split(highlight);
    titleParts = {
      before,
      highlighted: highlight,
      after: rest.join(highlight),
    };
  }

  return (
    <div
      className={cn(
        "flex flex-col mb-12 md:mb-16",
        isCenter && "items-center text-center",
        isRight && "items-end text-right",
        !isCenter && !isRight && "items-start text-left",
        className
      )}
    >
      {badge && (
        <Eyebrow
          variant="chip"
          theme={theme}
          className="mb-3.5"
        >
          {badge}
        </Eyebrow>
      )}

      <div className={cn("flex flex-col md:flex-row md:items-end justify-between w-full gap-4", isCenter && "md:justify-center")}>
        <div className={cn(isCenter ? "max-w-3xl" : "max-w-2xl")}>
          <h2
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]",
              isDark ? "text-white" : "text-[#101C19]",
              titleClassName
            )}
          >
            {titleParts ? (
              <>
                {titleParts.before}
                <span className="text-[#087A3D]">{titleParts.highlighted}</span>
                {titleParts.after}
              </>
            ) : (
              title
            )}
          </h2>

          {subtitle && (
            <p
              className={cn(
                "mt-4 text-base sm:text-lg leading-relaxed",
                isDark ? "text-white/70" : "text-[#65736D]"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>

        {action && !isCenter && (
          <div className="shrink-0 mb-1">{action}</div>
        )}
      </div>
    </div>
  );
}

