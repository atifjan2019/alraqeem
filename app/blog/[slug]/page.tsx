import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/postsStore";
import { CtaBand } from "@/components/Shared";
import RichText from "@/components/RichText";
import { images } from "@/lib/images";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <article>
        <section className="relative overflow-hidden bg-ink py-20 text-white sm:py-28">
          <img
            src={images.quran}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 overlay-hero" />
          <div className="container-site relative max-w-3xl">
            <p className="eyebrow text-brand-orange">
              {new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              · {post.readMinutes} min read
            </p>
            <h1 className="mt-4 text-3xl leading-tight text-white sm:text-5xl">
              {post.title}
            </h1>
          </div>
        </section>

        <section className="py-14 sm:py-16">
          <div className="container-site max-w-3xl">
            <RichText html={post.content} />
            <div className="rule-gradient mt-10" aria-hidden="true" />
            <Link
              href="/blog"
              className="mt-8 inline-block text-sm font-bold text-brand-blue hover:underline"
            >
              Back to all guides
            </Link>
          </div>
        </section>
      </article>

      <CtaBand
        title="Questions about this guide?"
        subtitle="Our team answers travel questions on WhatsApp every day, free of charge."
      />
    </>
  );
}
