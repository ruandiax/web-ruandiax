import { useState } from "react";
import { getAllPosts } from "@lib/projects";
import ItemPost from "@components/ItemPost";
import Layout from "@components/Layout";
import content from "../data/pages.json";
import styles from "../styles/Work.module.scss";

type Props = {
  locale: string;
  posts: Array<{
    slug: string;
    title: string;
    link?: string;
    description: string;
    thumbnailUrl: string;
    date: string;
  }>;
};

const Portfolio = ({ posts, locale }: Props) => {
  const [searchValue, setSearchValue] = useState("");
  const filteredBlogPosts = posts
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .filter((post) =>
      post.title.toLowerCase().includes(searchValue.toLowerCase())
    );

  const workContent = content.workPage;
  const pageLocale = locale === "pt-BR" ? "pt-BR" : "en-US";

  const baseURL = "rychillie.net";
  const linkURL =
    locale === "pt-BR" ? `${baseURL}/pt-BR/work` : `${baseURL}/work`;
  const { title, description, titleContent, contentPage, noResults, search } =
    workContent[pageLocale];

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
        {filteredBlogPosts.map((post) => (
          <ItemPost
            key={post.slug}
            title={post.title}
            slug={post.slug}
            description={post.description}
            thumbnailUrl={post.thumbnailUrl}
            date={post.date}
            locale={locale}
            link={post.link}
            notDefault
            hasBanner
          />
        ))}
      </div>
    </Layout>
  );
};

export default Portfolio;

export async function getStaticProps({ locale }: { locale: string }) {
  const posts = await getAllPosts({ locale });

  return {
    props: {
      locale,
      posts,
    },
  };
}
