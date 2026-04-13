import Link from "next/link";

export function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center px-4 md:px-8 py-20 md:py-32 justify-around"
    >
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>
        <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>
            Full-stack engineer with 5+ years of experience building scalable
            web and mobile applications. I built and scaled{" "}
            <Link
              href="https://www.watchwithme.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              WatchWithMe
            </Link>{" "}
            — a real-time watch party platform — from zero to 7,000+ users with
            paying customers. Currently building{" "}
            <Link
              href="https://artemis-ai-beta.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              Aegis
            </Link>
            , an AI system for querying and debugging production systems via
            natural language.
          </p>

          <p>
            I care about measurable outcomes. At{" "}
            <Link
              href="https://www.pickyourtrail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              Fluid.travel (PickYourTrail)
            </Link>
            , I revamped the hotel booking flow driving a 150% increase in
            bookings. At{" "}
            <Link
              href="https://klenty.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              Klenty
            </Link>
            , I rebuilt the mail tracking system reducing latency from 15
            minutes to 5 seconds. At{" "}
            <Link
              href="https://codedamn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              Codedamn
            </Link>
            , I cut infrastructure costs by 55% through container allocation
            optimization.
          </p>

          <p>
            My core strengths are real-time systems, observability, and
            distributed architecture. I was an invited speaker at Chennai Web
            Conf (Dec 2025) where I presented on{" "}
            <span className="text-foreground">"Artemis: Personal AI OS"</span>,
            focusing on AI-native applications and personal AI systems.
          </p>
        </div>
      </div>
    </section>
  );
}
