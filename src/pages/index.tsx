import fs from "fs";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "@components/NoScrollLink";
import Layout from "@components/Layout";
import SocialList from "@components/SocialList";
import content from "../data/pages.json";
import { getAllPostsByLocale } from "@lib/posts";
import { generateRssFeed } from "@lib/rss";
import ShortcutHome from "@components/ShortcutHome";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const router = useRouter();

  const homeContent = content.homePage;
  const { locale } = router;
  const pageLocale = locale === "pt-BR" ? "pt-BR" : "en-US";
  const {
    title,
    description,
    titleContent,
    synopsis,
    blog,
    know,
    myWork,
    littleMore,
    aboutMe,
  } = homeContent[pageLocale];

  const baseURL = "ruandiax.dev";
  const linkURL = locale === "pt-BR" ? `${baseURL}/pt-BR/` : `${baseURL}/`;

  return (
    <Layout
      title={title}
      description={description}
      locale={pageLocale}
      canonicalUrl={linkURL}
      center
    >
      <h1>{titleContent}</h1>
      <p>
        {synopsis} <Link href="/blog">{blog}</Link>, {know}{" "}
        <Link href="/work">{myWork}</Link> {littleMore}{" "}
        <Link href="/about">{aboutMe}</Link>.
      </p>
      <ShortcutHome locale={pageLocale} />
      <div className={styles.profile}>
        <div className={styles.containerImage}>
          <Image
            src="/images/ruanHome.webp"
            blurDataURL="/images/ruanHome.webp"
            placeholder="blur"
            quality={100}
            layout="fixed"
            width={48}
            height={48}
            alt="this is me"
            className={styles.profileImage}
          />
        </div>
        <SocialList />
      </div>
    </Layout>
  );
};

export default Home;

export async function getStaticProps({ locale }: { locale: string }) {
  const posts = await getAllPostsByLocale({ locale });
  const filteredPosts = posts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  );
  const rss = generateRssFeed();

  // fs.writeFileSync("./public/rss.xml", rss);

  return {
    props: {
      locale,
      posts,
    },
  };
}
