"use client";

import dynamic from "next/dynamic";

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
  loading: () => <></>
});

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
