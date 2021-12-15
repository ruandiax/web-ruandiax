import matter from "gray-matter";
import marked from "marked";
import glob from "glob-promise";
import path from "path";
import { promises as fs } from "fs";
import { timeToRead } from "@lib/utils";

const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://ruandiax.dev";

export async function getAllPosts({ locale = "en-US" }: { locale: string }) {
  const basePath = `./content/blog/${locale}`;

  const files = await glob(`${basePath}/*.md`);

  const posts = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.resolve(file);
      const fileContent = await fs.readFile(fullPath, "utf8");
      const meta = matter(fileContent);
      const readTime = timeToRead(meta.content);

      const time =
        locale === "pt-BR"
          ? `${readTime} min de leitura`
          : `${readTime} min of reading`;

      const thumbAPI = `${baseUrl}/api/thumbnail.png?title=${meta.data.title.replace(
        / /g,
        "%20"
      )}&slug=${
        path.parse(fullPath).name
      }&lang=${locale}&readTime=${time}&date=${meta.data.date}`;

      return {
        title: meta.data.title,
        slug: path.parse(fullPath).name,
        description: meta.data.description,
        timeToRead: time,
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
  const basePath = `./content/blog/${locale}`;

  const files = await glob(`${basePath}/*.md`);

  const posts = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.resolve(file);
      const fileContent = await fs.readFile(fullPath, "utf8");
      const meta = matter(fileContent);
      const content = marked(meta.content);
      const readTime = timeToRead(meta.content);

      const time =
        locale === "pt-BR"
          ? `${readTime} min de leitura`
          : `${readTime} min of reading`;

      const thumbAPI = `${baseUrl}/api/thumbnail.png?title=${meta.data.title.replace(
        / /g,
        "%20"
      )}&slug=${
        path.parse(fullPath).name
      }&lang=${locale}&readTime=${time}&date=${meta.data.date}`;

      return {
        title: meta.data.title,
        slug: path.parse(fullPath).name,
        description: meta.data.description,
        timeToRead: time,
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
  const basePath = `./content/blog/${locale}`;

  const files = await glob(`${basePath}/*.md`);

  const posts = await Promise.all(
    files.map(async (file) => {
      const fullPath = path.resolve(file);
      const fileContent = await fs.readFile(fullPath, "utf8");
      const meta = matter(fileContent);
      const content = marked(meta.content);
      const readTime = timeToRead(meta.content);

      const time =
        locale === "pt-BR"
          ? `${readTime} min de leitura`
          : `${readTime} min of reading`;

      const thumbAPI = `${baseUrl}/api/thumbnail.png?title=${meta.data.title.replace(
        / /g,
        "%20"
      )}&slug=${
        path.parse(fullPath).name
      }&lang=${locale}&readTime=${time}&date=${meta.data.date}`;

      return {
        title: meta.data.title,
        slug: path.parse(fullPath).name,
        description: meta.data.description,
        timeToRead: time,
        thumbnailUrl: thumbAPI,
        date: meta.data.date,
        content: content,
      };
    })
  );

  return posts;
}
