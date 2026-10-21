import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/work/CaseStudy";
import { getProject, projectImage, projects } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.name} — Website Case Study`,
    description: p.summary,
    openGraph: { images: [{ url: projectImage(p.slug), width: 1440, height: 900 }] },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const next = projects[(idx + 1) % projects.length];
  return <CaseStudy project={projects[idx]} next={next} />;
}
