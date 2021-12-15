import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "@components/NoScrollLink";
import Layout from "@components/Layout";
import content from "../data/pages.json";
import styles from "../styles/404.module.scss";

const Home: NextPage = () => {
  const errorContent = content.errorPage;
  const { locale } = useRouter();
  const pageLocale = locale === "pt-BR" ? "pt-BR" : "en-US";
  const { title, description, titleContent, contentPage, linkHome } =
    errorContent[pageLocale];

  const baseURL = "ruandiax.dev";
  const linkURL =
    locale === "pt-BR" ? `${baseURL}/pt-BR/404` : `${baseURL}/404`;

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
        {contentPage} <Link href="/">{linkHome}</Link>.
      </p>
    </Layout>
  );
};

export default Home;
