import { ExternalLink, FileDown, GithubIcon, Linkedin, MailIcon } from "lucide-react";
import Link from "next/link";

import { OPEN_TO_WORK } from "@/data/constants";

interface ContactData {
  title: string;
  description: string;
}

const contacts = [
  {
    type: "email",
    label: "harishkumar.vellore@gmail.com",
    url: "mailto:harishkumar.vellore@gmail.com",
    icon: MailIcon
  },
  {
    type: "linkedin",
    label: "linkedin.com/in/harishkumark025",
    url: "https://linkedin.com/in/harishkumark025",
    icon: Linkedin
  },
  {
    type: "github",
    label: "github.com/thelonewolf123",
    url: "https://github.com/thelonewolf123",
    icon: GithubIcon
  }
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center px-4 md:px-8 py-20 md:py-32 border-t justify-around border-border"
    >
      <div className="max-w-2xl w-full">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Get in Touch</h2>
          {OPEN_TO_WORK && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Open to opportunities
            </span>
          )}
        </div>
        <p className="text-lg text-muted-foreground mb-10">
          I'm always interested in hearing about interesting projects and
          opportunities. Feel free to reach out!
        </p>

        <div className="space-y-6">
          {contacts.map((contact, index) => {
            const IconComponent = contact.icon;
            const isExternal = contact.type !== "email";

            return (
              <Link
                key={index}
                href={contact.url}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 text-lg hover:text-accent transition-colors group"
              >
                <IconComponent className="w-6 h-6 shrink-0" />
                <span className="truncate">{contact.label}</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </Link>
            );
          })}
          <Link
            href="/Harish_resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-lg hover:text-accent transition-colors group pt-4 border-t border-border"
          >
            <FileDown className="w-6 h-6 shrink-0" />
            <span>Download Resume (PDF)</span>
            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}
