import Link from "next/link";

export function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center px-4 md:px-8 py-20 md:py-32 justify-around"
    >
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">About Me</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { value: "7,000+", label: "Users Scaled" },
            { value: "4", label: "Production AI Systems" },
            { value: "5s", label: "Latency (was 15min)" },
            { value: "55%", label: "Cost Reduction" }
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border bg-accent/5 p-4 text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-accent">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p>
            AI engineer with 5+ years of experience building production-grade
            web, mobile, and AI agent systems. I built{" "}
            <Link
              href="/docs/mail-pilot/"
              className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              Mail Pilot
            </Link>
            , an AI-native email client with CopilotKit and tool-based AI
            architecture;{" "}
            <Link
              href="/docs/quartermaster/"
              className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              Quartermaster
            </Link>
            , a conversational AI agent with 26 tools built on
            LangGraph/deepagents; and{" "}
            <Link
              href="/docs/aegis/"
              className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              Aegis
            </Link>
            , an AI debugging system that translates natural language to SQL
            and CloudWatch queries. Also scaled{" "}
            <Link
              href="https://www.watchwithme.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              WatchWithMe
            </Link>{" "}
            to 7,000+ users. Each system ships with full technical
            documentation.
          </p>

          <p>
            I care about measurable outcomes — the same engineering discipline
            goes into my AI agent systems. At{" "}
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
            My core strengths are AI agent architecture, LLM orchestration,
            real-time systems, and observability. I was an invited speaker at
            Chennai Web Conf (Dec 2025) where I presented{" "}
            <span className="text-foreground">"Artemis: Personal AI OS"</span>,
            covering AI-native applications and personal AI system design.
          </p>
        </div>
      </div>
    </section>
  );
}
