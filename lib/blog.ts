import fs from "fs"
import path from "path"

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  tags: string[]
  content: string
  image?: string
}

const blogDir = path.join(process.cwd(), "content", "blogs")

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(blogDir)
  const posts = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(".md", "")
      return getBlogPostBySlug(slug)
    })

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPostBySlug(slug: string): BlogPost {
  const filePath = path.join(blogDir, `${slug}.md`)
  const fileContent = fs.readFileSync(filePath, "utf-8")

  const { metadata, content } = parseMarkdown(fileContent)

  return {
    slug,
    title: metadata.title || "Untitled",
    description: metadata.description || "",
    date: metadata.date || new Date().toISOString(),
    author: metadata.author || "Harish Kumar",
    tags: metadata.tags || [],
    content,
    image: metadata.image,
  }
}

function parseMarkdown(content: string): { metadata: Record<string, any>; content: string } {
  const lines = content.split("\n")
  const metadata: Record<string, any> = {}

  let startIdx = 0
  let endIdx = 0

  if (lines[0] === "---") {
    startIdx = 1
    endIdx = lines.findIndex((line, idx) => idx > 0 && line === "---")

    if (endIdx !== -1) {
      lines.slice(startIdx, endIdx).forEach((line) => {
        const [key, ...values] = line.split(":")
        const value = values.join(":").trim()

        if (key && value) {
          if (value.startsWith("[") && value.endsWith("]")) {
            metadata[key.trim()] = JSON.parse(value)
          } else if (value === "true" || value === "false") {
            metadata[key.trim()] = value === "true"
          } else {
            metadata[key.trim()] = value.replace(/^["']|["']$/g, "")
          }
        }
      })

      const markdownContent = lines
        .slice(endIdx + 1)
        .join("\n")
        .trim()
      return { metadata, content: markdownContent }
    }
  }

  return { metadata, content }
}
