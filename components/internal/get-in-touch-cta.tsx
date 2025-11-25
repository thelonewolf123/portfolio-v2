import { MailIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type GetInTouchCTAProps = {
  href?: string;
  className?: string;
};

export function GetInTouchCTA({
  href = "mailto:harishkumar.vellore@gmail.com",
  className
}: GetInTouchCTAProps) {
  return (
    <div
      className={cn("flex w-full justify-center md:justify-start", className)}
    >
      <a
        href={href}
        className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-blue-600/90 via-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition-all duration-200 hover:scale-[1.01] hover:shadow-xl"
      >
        <span>Get in Touch</span>
        <MailIcon className="h-4 w-4 opacity-90 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}
