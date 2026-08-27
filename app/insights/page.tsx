import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Insights — ConversionHouse",
  description: "Notes on brand, growth, and building digital systems that perform.",
};

const POSTS = [
  {
    title: "Why pretty design without purpose fails to convert visitors",
    excerpt: "Design matters. But design without action is decoration. We breakdown why brand strategy must inform visual architecture for conversion systems.",
    date: "August 24, 2026",
    category: "Conversion Rate Optimization",
  },
  {
    title: "Setting up Google Search Console foundations from day one",
    excerpt: "SEO, technical optimization, analytics and search indexing are not things to bolt on after launch. We cover the setup blueprint.",
    date: "July 18, 2026",
    category: "Search Engine Optimization",
  },
  {
    title: "Headless Shopify vs Shopify templates: The performance breakdown",
    excerpt: "Every millisecond counts. Explore how headless Shopify custom storefronts yield faster interactions and give brands control over growth.",
    date: "June 05, 2026",
    category: "E-commerce Development",
  },
];

export default function InsightsPage() {
  return (
    <main className="bg-black text-white pt-32 pb-24">
      <div className="container-x">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <span className="text-[#ff5722] text-xs font-mono uppercase tracking-widest">[ Studio Journal ]</span>
          <h1 className="font-display text-4xl sm:text-6xl text-white leading-tight">
            Insights
          </h1>
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed">
            Notes on brand, growth, and building digital systems that perform.
          </p>
        </div>

        {/* Blog Post List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.map((post) => (
            <div
              key={post.title}
              className="bg-neutral-950 border border-neutral-900 p-8 rounded-2xl flex flex-col justify-between group hover:border-[#ff5722] transition-colors"
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#ff5722] block mb-4">
                  {post.category}
                </span>
                <h2 className="font-display text-xl text-white mb-4 group-hover:text-[#ff5722] transition-colors">
                  {post.title}
                </h2>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="border-t border-neutral-900 pt-4 mt-auto flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-500">{post.date}</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-white group-hover:text-[#ff5722] flex items-center gap-1 transition-colors">
                  Read More <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
