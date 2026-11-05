import { Container } from "../common/Container";
import { SectionHeading } from "../common/SectionHeading";

const techCategories = [
  {
    category: "AI & Machine Learning",
    items: ["Python", "PyTorch", "TensorFlow", "OpenCV", "LangGraph", "LlamaIndex", "Hugging Face", "CUDA"],
  },
  {
    category: "Modern Web & Mobile",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Native", "Framer Motion", "GraphQL", "WebSockets"],
  },
  {
    category: "Cloud, Data & DevOps",
    items: ["FastAPI", "Node.js", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS", "Kafka", "Qdrant Vector DB"],
  },
];

export function TechEcosystem() {
  return (
    <section className="py-20 md:py-24 bg-[#FAFCF9] border-t border-[#E3EDE5]">
      <Container size="wide">
        <SectionHeading
          badge="Engineering Stack"
          title="Battle-Tested Technology Ecosystem."
          highlight="Battle-Tested"
          subtitle="We select technologies based on performance, type safety, ecosystem maturity, and enterprise maintainability."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {techCategories.map((cat) => (
            <div
              key={cat.category}
              className="p-7 rounded-2xl bg-white border border-[#E3EDE5] shadow-xs"
            >
              <h3 className="text-base font-bold text-[#101C19] pb-4 mb-5 border-b border-[#E3EDE5] flex items-center justify-between">
                <span>{cat.category}</span>
                <span className="w-2 h-2 rounded-full bg-[#159B50]" />
              </h3>

              <div className="flex flex-wrap gap-2">
                {cat.items.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[#F4FAF3] text-[#075C32] border border-[#E3EDE5] hover:border-[#159B50] hover:bg-[#E8F5E9] transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

