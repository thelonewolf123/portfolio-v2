import ReactMarkdownComponent from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";

interface ReactMarkdownProps {
  content: string;
}

export function ReactMarkdown({ content }: ReactMarkdownProps) {
  return (
    <ReactMarkdownComponent
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypePrism, { ignoreMissing: true }]]}
      components={{
        pre({ children }) {
          return <pre className="not-prose">{children}</pre>;
        },
        a({ href, children }) {
          return (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          );
        }
      }}
    >
      {content}
    </ReactMarkdownComponent>
  );
}
