"use client"

import { useMemo } from "react"

interface ReactMarkdownProps {
  content: string
}

export function ReactMarkdown({ content }: ReactMarkdownProps) {
  const renderedContent = useMemo(() => {
    const html = content
      // Headers
      .replace(/^### (.*?)$/gm, '<h3 class="text-xl font-bold mt-8 mb-4">$1</h3>')
      .replace(/^## (.*?)$/gm, '<h2 class="text-2xl font-bold mt-10 mb-6">$1</h2>')
      .replace(/^# (.*?)$/gm, '<h1 class="text-3xl font-bold mt-12 mb-8">$1</h1>')
      // Bold and italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/__(.*?)__/g, '<strong class="font-bold">$1</strong>')
      .replace(/_(.*?)_/g, '<em class="italic">$1</em>')
      // Code blocks
      .replace(
        /```([\s\S]*?)```/g,
        '<pre class="bg-card border border-border rounded-lg p-4 overflow-x-auto mb-6"><code class="text-sm">$1</code></pre>',
      )
      // Inline code
      .replace(/`([^`]+)`/g, '<code class="bg-card px-2 py-1 rounded text-sm border border-border">$1</code>')
      // Links
      .replace(/\[(.*?)\]$$(.*?)$$/g, '<a href="$2" class="text-accent hover:underline">$1</a>')
      // Line breaks
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, "<br />")
      // List items
      .replace(/^\* (.*?)$/gm, '<li class="ml-6 mb-2">$1</li>')
      .replace(/^- (.*?)$/gm, '<li class="ml-6 mb-2">$1</li>')
      .replace(/(<li.*?<\/li>)/s, '<ul class="mb-6">$1</ul>')
      // Blockquotes
      .replace(
        /^> (.*?)$/gm,
        '<blockquote class="border-l-4 border-accent pl-4 italic my-4 text-muted-foreground">$1</blockquote>',
      )

    return `<p class="mb-4">${html}</p>`
  }, [content])

  return <div className="space-y-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: renderedContent }} />
}
