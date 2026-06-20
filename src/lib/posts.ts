import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
};

export type Post = PostMeta & {
  content: string;
};

function readPostFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx?$/, "");
  const fullPath = path.join(POSTS_DIR, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
    description: data.description ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    readingTime: readingTime(content).text,
    content,
  };
}

export function getAllPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs.readdirSync(POSTS_DIR).filter((f) => /\.mdx?$/.test(f));
}

export function getAllPosts(): PostMeta[] {
  return getAllPostFiles()
    .map((file) => {
      const { content: _content, ...meta } = readPostFile(file);
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  const files = getAllPostFiles();
  const match = files.find((f) => f.replace(/\.mdx?$/, "") === slug);
  if (!match) return null;
  return readPostFile(match);
}

export function getAllSlugs(): string[] {
  return getAllPostFiles().map((f) => f.replace(/\.mdx?$/, ""));
}
