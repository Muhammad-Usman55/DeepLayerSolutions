import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight, Tag } from "lucide-react";
import { blogPostsData } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import { Container } from "@/components/common/Container";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { CTASection } from "@/components/common/CTASection";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { siteConfig } from "@/config/site";

export async function generateStaticParams() {
  return blogPostsData.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  const url = `${siteConfig.url}/blog/${post.slug}`;

  return {
    title: `${post.title} — DeepLayer Blog`,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      url,
      title: `${post.title} | DeepLayer Solutions`,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [siteConfig.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | DeepLayer Solutions`,
      description: post.excerpt,
      images: [siteConfig.ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPostsData.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const related = blogPostsData.filter((p) => p.id !== post.id).slice(0, 2);

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo/logo.png`,
      },
    },
    keywords: post.tags.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
  };

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      {/* Article Header */}
      <section className="relative overflow-hidden pt-8 pb-14 bg-gradient-to-b from-[#E9FFF2]/50 via-[#FAFCF9] to-transparent border-b border-[#DFEDE5]">
        <Container size="default">
          <Breadcrumb
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.category, href: "/blog" },
            ]}
            className="mb-8"
          />

          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#E9FFF2] text-[#008F53] border border-[#DFEDE5] mb-4">
              {post.category}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#142A27] leading-tight">
              {post.title}
            </h1>

            {/* Post Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-[#64736F] pb-6 border-b border-[#DFEDE5]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#E9FFF2] text-[#008F53] font-bold flex items-center justify-center">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-[#142A27] block">{post.author.name}</span>
                  <span className="text-[11px] text-[#64736F]">{post.author.role}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#008F53]" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#008F53]" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Article Content */}
      <section className="py-14 sm:py-20">
        <Container size="default">
          <div className="prose prose-lg max-w-none text-[#142A27]">
            {/* Intro Lead Paragraph */}
            <p className="text-lg sm:text-xl text-[#142A27] font-medium leading-relaxed bg-[#E9FFF2]/60 p-6 sm:p-8 rounded-2xl border-l-4 border-[#008F53] mb-10">
              {post.content.intro}
            </p>

            {/* Sections */}
            <div className="space-y-12">
              {post.content.sections.map((section, idx) => (
                <div key={idx} className="space-y-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#142A27] tracking-tight">
                    {section.heading}
                  </h2>

                  {section.body.map((para, pIdx) => (
                    <p key={pIdx} className="text-base sm:text-lg text-[#64736F] leading-relaxed">
                      {para}
                    </p>
                  ))}

                  {/* Key Takeaways Callout */}
                  {section.keyTakeaways && section.keyTakeaways.length > 0 && (
                    <div className="my-6 p-6 rounded-2xl bg-white border border-[#DFEDE5] shadow-xs">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#008F53] block mb-2">
                        Key Engineering Takeaway:
                      </span>
                      <ul className="space-y-2">
                        {section.keyTakeaways.map((takeaway, tIdx) => (
                          <li key={tIdx} className="text-sm font-semibold text-[#142A27] flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#008F53] shrink-0 mt-2" />
                            <span>{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Conclusion */}
            <div className="mt-12 pt-8 border-t border-[#DFEDE5]">
              <h3 className="text-xl font-bold text-[#142A27] mb-3">Architectural Conclusion</h3>
              <p className="text-base sm:text-lg text-[#64736F] leading-relaxed">
                {post.content.conclusion}
              </p>
            </div>

            {/* Tags Strip */}
            <div className="mt-10 pt-6 border-t border-[#DFEDE5] flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-[#008F53]" />
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-[#E9FFF2] text-[#008F53] border border-[#DFEDE5]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Related Articles Strip */}
          {related.length > 0 && (
            <div className="mt-16 pt-12 border-t border-[#DFEDE5]">
              <h3 className="text-2xl font-bold text-[#142A27] mb-6">
                Recommended Reading
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className="p-6 rounded-2xl bg-white border border-[#DFEDE5] hover:border-[#008F53] shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-xs font-mono uppercase text-[#008F53] font-semibold">
                        {rel.category}
                      </span>
                      <h4 className="text-lg font-bold text-[#142A27] group-hover:text-[#008F53] transition-colors mt-1">
                        {rel.title}
                      </h4>
                      <p className="mt-2 text-xs text-[#64736F] line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-[#DFEDE5] flex items-center justify-between text-xs text-[#008F53] font-bold">
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Article CTA */}
      <CTASection
        title="Looking to Implement Next-Gen AI in Your Business?"
        subtitle="Schedule an architectural working session with our principal engineers."
        buttonText="Discuss Your Architecture"
        buttonHref="/contact"
      />
    </PageWrapper>
  );
}
