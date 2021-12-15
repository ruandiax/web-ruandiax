import { useState } from "react";
import { getAllPosts } from "@lib/posts";
import Layout from "@components/Layout";
import ItemPost from "@components/ItemPost";
import content from "../../data/pages.json";
import styles from "../../styles/Blog.module.scss";

type Props = {
  locale: string;
  posts: Array<{
    slug: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    date: string;
    timeToRead: string;
  }>;
};

const Blog = ({ posts, locale }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const filteredBlogPosts = posts
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter((post) =>
      post.title.toLowerCase().includes(searchValue.toLowerCase())
    );

  const blogContent = content.blogPage;
  const pageLocale = locale === "pt-BR" ? "pt-BR" : "en-US";

  const { title, description, titleContent, contentPage, noResults, search } =
    blogContent[pageLocale];

  const baseURL = "rychillie.net";
  const linkURL =
    locale === "pt-BR" ? `${baseURL}/pt-BR/blog` : `${baseURL}/blog`;

  return (
    <Layout
      title={title}
      description={description}
      locale={pageLocale}
      canonicalUrl={linkURL}
      hasHeader
      hasNewsletter
      hasFooter
    >
      <h1>{titleContent}</h1>

      <div className={styles.search}>
        <input
          aria-label="Search articles"
          placeholder={search}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
        />
        <svg
          className={styles.searchIcon}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className={styles.postListing}>
        {!filteredBlogPosts.length && <p>{noResults}</p>}
        {filteredBlogPosts.length && (
          <ul>
            {filteredBlogPosts.map((post) => (
              <li key={post.slug}>
                <ItemPost
                  title={post.title}
                  slug={post.slug}
                  description={post.description}
                  thumbnailUrl={post.thumbnailUrl}
                  date={post.date}
                  locale={locale}
                  timeToRead={post.timeToRead}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default Blog;

export async function getStaticProps({ locale }: { locale: string }) {
  const posts = await getAllPosts({ locale });

  return {
    props: {
      locale,
      posts,
    },
  };
}
