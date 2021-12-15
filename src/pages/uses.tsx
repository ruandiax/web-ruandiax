import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "@components/Layout";
import content from "../data/pages.json";
import Image from "next/image";
import styles from "../styles/Uses.module.scss";

const Uses: NextPage = () => {
  const aboutContent = content.usesPage;
  const { locale } = useRouter();
  const pageLocale = locale === "pt-BR" ? "pt-BR" : "en-US";
  const { title, description, titleContent, contentPage } =
    aboutContent[pageLocale];

  const baseURL = "ruandiax.dev";
  const linkURL =
    locale === "pt-BR" ? `${baseURL}/pt-BR/uses` : `${baseURL}/uses`;

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

      <Image
        src={"/images/home-office.png"}
        blurDataURL="/images/home-office.png"
        placeholder="blur"
        quality={100}
        width={3840}
        height={2160}
        layout="intrinsic"
        alt="home-office"
      />

      <br />
      <br />

      <div className={styles.content}>
        <div dangerouslySetInnerHTML={{ __html: contentPage }}></div>
      </div>
    </Layout>
  );
};

export default Uses;
