import React from "react";
import type { Metadata } from "next";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { IndustriesContent } from "@/components/industries/IndustriesContent";

export const metadata: Metadata = {
  title: "Industries & Sectors | DeepLayer Solutions",
  description:
    "Tailored digital solutions, AI workflows, and software engineering addressing the operational realities of Healthcare, Finance, Manufacturing, Logistics, and more.",
  alternates: {
    canonical: "/industries",
  },
};

export default function IndustriesPage() {
  return (
    <PageWrapper>
      <IndustriesContent />
    </PageWrapper>
  );
}
