import { ExternalLink, GithubIcon, Linkedin, MailIcon } from "lucide-react";
import Link from "next/link";

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
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Get in Touch</h2>
        <p className="text-lg text-muted-foreground mb-12">
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
                <IconComponent className="w-6 h-6" />
                <span>{contact.label}</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
