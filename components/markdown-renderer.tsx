"use client";

import MarkdownPreview from "@uiw/react-markdown-preview";

interface ReactMarkdownProps {
  content: string;
}

export function ReactMarkdown({ content }: ReactMarkdownProps) {
  return (
    <MarkdownPreview
      source={content}
      style={{
        padding: 0,
        backgroundColor: "transparent"
      }}
      wrapperElement={{
        "data-color-mode": "dark"
      }}
    />
  );
}
