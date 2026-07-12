export function blogPostJsonLd(post: {
  title: string;
  description: string;
  date: string;
  author: string;
  slug: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author,
      url: "https://harishkumar.info"
    },
    url: `https://harishkumar.info/blog/${post.slug}/`,
    image: post.image
      ? `https://harishkumar.info${post.image}`
      : "https://harishkumar.info/og-image.png",
    publisher: {
      "@type": "Person",
      name: "Harish Kumar",
      url: "https://harishkumar.info"
    }
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Harish Kumar",
    jobTitle: "Full Stack & AI Engineer",
    url: "https://harishkumar.info",
    description:
      "AI Engineer building production-grade AI agent systems — Aegis (AI debugging), Mail Pilot (AI-native email), and Quartermaster (conversational AI).",
    sameAs: [
      "https://github.com/thelonewolf123",
      "https://linkedin.com/in/harishkumark025"
    ],
    image: "https://harishkumar.info/og-image.png",
    knowsAbout: [
      "React",
      "Next.js",
      "React Native",
      "TypeScript",
      "Node.js",
      "Python",
      "LLM Agents",
      "LangGraph",
      "RAG",
      "Prompt Engineering",
      "CopilotKit",
      "OpenRouter",
      "Distributed Systems",
      "Real-time Systems",
      "Observability",
      "AI Agents",
      "PostgreSQL",
      "MongoDB",
      "AWS",
      "Docker"
    ]
  };
}
