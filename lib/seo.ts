export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Harish Kumar",
    jobTitle: "Full Stack Engineer",
    url: "https://harishkumar.info",
    description:
      "Full Stack Engineer with 5+ years of experience. Built WatchWithMe to 7,000+ users. Building Aegis and Stardust.",
    sameAs: [
      "https://github.com/thelonewolf123",
      "https://linkedin.com/in/harishkumark025"
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "React Native",
      "TypeScript",
      "Node.js",
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
