import matter from "gray-matter";
import marked from "marked";
import glob from "glob-promise";
import path from "path";
import { promises as fs } from "fs";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://rychillie.net";

export async function getAllPosts({ locale = "en-US" }: { locale: string }) {
  const basePath = `./content/work/${locale}`;

  const files = await glob(`${basePath}/*.md`);

  const posts = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.resolve(file);
      const fileContent = await fs.readFile(fullPath, "utf8");
      const meta = matter(fileContent);

      const thumbAPI = `${baseUrl}/api/thumbnail.png?title=${meta.data.title.replace(
        / /g,
        "%20"
      )}&slug=${path.parse(fullPath).name}&lang=${locale}`;

      return {
        title: meta.data.title,
        slug: path.parse(fullPath).name,
        link: meta.data.link,
        description: meta.data.description,
        thumbnailUrl: thumbAPI,
        date: meta.data.date,
      };
    })
  );

  return posts;
}

export async function getPostBySlug(
  slug: string,
  { locale = "en-US" }: { locale: string }
) {
  const basePath = `./content/work/${locale}`;

  const files = await glob(`${basePath}/*.md`);

  const posts = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.resolve(file);
      const fileContent = await fs.readFile(fullPath, "utf8");
      const meta = matter(fileContent);
      const content = marked(meta.content);

      const thumbAPI = `${baseUrl}/api/thumbnail.png?title=${meta.data.title.replace(
        / /g,
        "%20"
      )}&slug=${path.parse(fullPath).name}&lang=${locale}`;

      return {
        title: meta.data.title,
        slug: path.parse(fullPath).name,
        link: meta.data.link,
        description: meta.data.description,
        thumbnailUrl: thumbAPI,
        date: meta.data.date,
        content: content,
      };
    })
  );

  const post = posts.find((p) => p.slug === slug);

  return post;
}

export async function getAllPostsByLocale({
  locale = "en-US",
}: {
  locale: string;
}) {
  const basePath = `./content/work/${locale}`;

  const files = await glob(`${basePath}/*.md`);

  const posts = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.resolve(file);
      const fileContent = await fs.readFile(fullPath, "utf8");
      const meta = matter(fileContent);
      const content = marked(meta.content);

      const thumbAPI = `${baseUrl}/api/thumbnail.png?title=${meta.data.title.replace(
        / /g,
        "%20"
      )}&slug=${path.parse(fullPath).name}&lang=${locale}`;

      return {
        title: meta.data.title,
        slug: path.parse(fullPath).name,
        link: meta.data.link,
        description: meta.data.description,
        thumbnailUrl: thumbAPI,
        date: meta.data.date,
        content: content,
      };
    })
  );

  return posts;
}
