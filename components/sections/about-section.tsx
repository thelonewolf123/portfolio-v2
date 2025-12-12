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
            I am a results-obsessed Full-Stack Engineer focused on system
            architecture and measurable business impact. With nearly five years
            of intensive experience in high-growth environments, I specialize in
            bridging the gap between complex, scalable backend engineering and
            seamless, high-conversion user experiences.
          </p>

          <p>
            My approach balances technical depth with business outcomes. At{" "}
            <Link
              href="https://www.pickyourtrail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              Pickyourtrail
            </Link>
            , I re-architected a high-scale booking flow to reduce friction,
            driving a verified 150% increase in conversion rates (driving
            significant revenue uplift). Prior to that, at{" "}
            <Link
              href="https://codedamn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              Codedamn
            </Link>
            , I focused on heavy infrastructure optimization, utilizing
            container pipelines (Docker/Kubernetes) to slash AWS operational
            costs by 55% while improving uptime.
          </p>

          <p>
            Beyond core responsibilities, I build complex distributed systems to
            stay on the bleeding edge. I architected{" "}
            <Link
              href="https://artemis-ai-beta.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              Artemis
            </Link>{" "}
            (an AI OS leveraging RabbitMQ and Vector DBs for context awareness)
            and built{" "}
            <Link
              href="https://watchwithme.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 hover:text-primary transition-colors"
            >
              WatchWithMe
            </Link>
            , a P2P streaming platform currently serving over 3,000 monthly
            active users with low-latency performance.
          </p>
        </div>
      </div>
    </section>
  );
}
