import { Mail, Github, Send } from "lucide-react";
import { type CVData } from "@/entities/cv/model/types";

interface HeaderProps {
  data: Pick<CVData, "name" | "title" | "contacts">;
}

export const Header = ({ data }: HeaderProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      event.currentTarget.click();
    }
  };

  return (
    <header className="border-b border-border pb-8 mb-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{data.name}</h1>
      <h2 className="text-xl md:text-2xl text-muted-foreground mb-6">{data.title}</h2>
      <div className="flex flex-wrap gap-4">
        <a
          href={`mailto:${data.contacts.email}`}
          className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
          aria-label={`Email: ${data.contacts.email}`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <Mail className="w-4 h-4" />
          <span>{data.contacts.email}</span>
        </a>
        <a
          href={`https://${data.contacts.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
          aria-label={`GitHub: ${data.contacts.github}`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <Github className="w-4 h-4" />
          <span>{data.contacts.github}</span>
        </a>
        <a
          href={`https://t.me/${data.contacts.telegram.replace("@", "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
          aria-label={`Telegram: ${data.contacts.telegram}`}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <Send className="w-4 h-4" />
          <span>{data.contacts.telegram}</span>
        </a>
      </div>
    </header>
  );
};
