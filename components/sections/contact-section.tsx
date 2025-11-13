import { ExternalLink, GithubIcon, Linkedin, MailIcon } from "lucide-react";

interface ContactItem {
  type: string;
  label: string;
  url: string;
  icon: string;
}

interface ContactData {
  title: string;
  description: string;
  contacts: ContactItem[];
}

interface ContactSectionProps {
  data: ContactData;
}

const iconMap = {
  MailIcon: MailIcon,
  Linkedin: Linkedin,
  GithubIcon: GithubIcon
};

export function ContactSection({ data }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="min-h-screen flex items-center px-4 md:px-8 py-20 md:py-32 border-t justify-around border-border"
    >
      <div className="max-w-2xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">{data.title}</h2>
        <p className="text-lg text-muted-foreground mb-12">
          {data.description}
        </p>
        <div className="space-y-6">
          {data.contacts.map((contact, index) => {
            const IconComponent = iconMap[contact.icon as keyof typeof iconMap];
            const isExternal = contact.type !== "email";

            return (
              <a
                key={index}
                href={contact.url}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="flex items-center gap-3 text-lg hover:text-accent transition-colors group"
              >
                <IconComponent className="w-6 h-6" />
                <span>{contact.label}</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
