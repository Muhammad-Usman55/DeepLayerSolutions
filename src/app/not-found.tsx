import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { TechLayerVisual } from "@/components/common/TechLayerVisual";

export default function NotFound() {
  return (
    <main className="min-h-[75vh] flex items-center justify-center py-20 bg-gradient-to-b from-[#E9FFF2]/50 via-transparent to-transparent">
      <Container size="sm" className="text-center">
        <div className="w-32 h-32 mx-auto mb-6">
          <TechLayerVisual className="max-w-[128px]" />
        </div>

        <span className="inline-block px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#E9FFF2] text-[#008F53] border border-[#DFEDE5] mb-4">
          Error 404
        </span>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#142A27]">
          Page Not Found
        </h1>

        <p className="mt-4 text-base sm:text-lg text-[#64736F] max-w-md mx-auto leading-relaxed">
          The architectural route you are looking for has been moved, renamed, or does not exist on this layer.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" variant="primary" size="md" withArrow>
            Return to Homepage
          </Button>
          <Button href="/services" variant="outline" size="md">
            Browse Services
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-[#DFEDE5] flex flex-wrap items-center justify-center gap-6 text-xs text-[#64736F]">
          <Link href="/portfolio" className="hover:text-[#008F53] transition-colors">
            Our Portfolio
          </Link>
          <span>•</span>
          <Link href="/industries" className="hover:text-[#008F53] transition-colors">
            Industries
          </Link>
          <span>•</span>
          <Link href="/blog" className="hover:text-[#008F53] transition-colors">
            Blog Insights
          </Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-[#008F53] transition-colors">
            Contact Support
          </Link>
        </div>
      </Container>
    </main>
  );
}
