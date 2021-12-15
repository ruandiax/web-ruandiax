import React, { useEffect } from "react";
import { getPostBySlug, getAllPosts } from "@lib/posts";
import Layout from "@components/Layout";
import { Params } from "next/dist/server/router";
import { parseISO, format } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";
import Prism from "prismjs";
import styles from "../../styles/Blog.module.scss";

type Props = {
  locale: "en-US" | string;
  locales: string[];
  params: {
    slug: string;
  };
  post: {
    title: string;
    description: string;
    thumbnailUrl: string;
    date: string;
    content: string;
    slug: string;
    timeToRead: string;
  };
};

// get all posts by locale and return path slug of pos
export async function getStaticPaths() {
  const enPosts = await getAllPosts({ locale: "en-US" });
  const ptPosts = await getAllPosts({ locale: "pt-BR" });

  const enPaths = enPosts.map((post) => ({
    params: { slug: post.slug },
    locale: "en-US",
  }));

  const ptPaths = ptPosts.map((post) => ({
    params: { slug: post.slug },
    locale: "pt-BR",
  }));

  return {
    paths: enPaths.concat(ptPaths),
    fallback: false,
  };
}

// getStaticProps for generate blog post page
export async function getStaticProps({ locale, params }: Props & Params) {
  const post = await getPostBySlug(params.slug, { locale });

  return {
    props: {
      locale,
      post,
    },
  };
}

// component for generate blog post page
const BlogPost = ({ post, locale }: Props) => {
  const pageLocale = locale === "pt-BR" ? "pt-BR" : "en-US";
  const dateLocale = locale === "pt-BR" ? ptBR : enUS;

  const baseURL = "rychillie.net";
  const linkURL =
    locale === "pt-BR"
      ? `${baseURL}/pt-BR/${post.slug}`
      : `${baseURL}/${post.slug}`;

  useEffect(() => {
    if (typeof window !== "undefined") {
      Prism.highlightAll();
    }
  }, []);

  return (
    <Layout
      title={post.title}
      description={post.description}
      urlThumbnail={post.thumbnailUrl}
      canonicalUrl={linkURL}
      slug={post.slug}
      locale={pageLocale}
      hasHeader
      hasNewsletter
      hasFooter
    >
      <h1 className={styles.titlePost}>{post.title}</h1>

      <div className={styles.details}>
        <span>
          {format(parseISO(post.date), "MMMM dd, yyyy", {
            locale: dateLocale,
          })}
        </span>
        &bull;
        <span>{post.timeToRead}</span>
      </div>

      <article className={styles.article}>
        <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
      </article>
    </Layout>
  );
};

export default BlogPost;
