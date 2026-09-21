import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { articles, categoryColors, getArticleBySlug } from "../articles";

type InsightArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: InsightArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Insight Not Found",
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function InsightArticlePage({
  params,
}: InsightArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <section className="bg-navy-950 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link
              href="/insights"
              className="text-sm font-semibold text-blue-300 hover:text-blue-200"
            >
              Back to Insights
            </Link>
            <div className="mt-6">
              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                  categoryColors[article.category]
                }`}
              >
                {article.category}
              </span>
            </div>
            <h1 className="mt-5 text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              {article.title}
            </h1>
            <p className="mt-5 text-lg text-slate-300 leading-relaxed">
              {article.excerpt}
            </p>
            <time className="mt-6 block text-sm font-medium text-slate-400">
              {article.date}
            </time>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <Container>
          <article className="mx-auto max-w-3xl">
            <div className="space-y-6 text-lg leading-relaxed text-slate-700">
              {article.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>
        </Container>
      </section>

      <section className="py-16 bg-slate-50">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center">
            <h2 className="text-2xl font-bold text-navy-900">
              Evaluate CyberReady as an Acquisition Asset
            </h2>
            <p className="mt-3 text-slate-600 leading-relaxed">
              Qualified buyers may request access to the Hall Monitor demo,
              technical documentation, screenshots, and buyer materials.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/insights" variant="outline">
                Back to Insights
              </Button>
              <Button href="/contact">Request Acquisition Access</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
