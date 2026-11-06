import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-xs sm:text-sm text-[#64736F]", className)}>
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        <li className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-[#008F53] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((index_item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5 sm:gap-2">
              <ChevronRight className="w-3.5 h-3.5 text-[#008F53]/40" />
              {isLast || !index_item.href ? (
                <span className="font-medium text-[#142A27] line-clamp-1">
                  {index_item.label}
                </span>
              ) : (
                <Link
                  href={index_item.href}
                  className="hover:text-[#008F53] transition-colors line-clamp-1"
                >
                  {index_item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

