import React, { ReactNode } from "react";
import { NextSeo } from "next-seo";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Newsletter from "@components/Newsletter";

type Props = {
  children: ReactNode;
  title: string;
  description: string;
  slug?: string;
  canonicalUrl?: string;
  urlThumbnail?: string;
  hasHeader?: boolean | false;
  hasFooter?: boolean | false;
  hasNewsletter?: boolean | false;
  center?: boolean | false;
  locale?: string | undefined;
};

const variants = {
  hidden: {
    opacity: 0,
    x: -200,
    y: 0,
  },
  enter: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  exit: {
    opacity: 0,
    x: 0,
    y: -100,
  },
  otherHidden: {
    opacity: 0,
    x: 0,
    y: 200,
  },
};

const defaultImg = "https://ruandiax.dev/api/thumbnail.png?defaultImg";

const Layout = ({
  children,
  title,
  description,
  urlThumbnail,
  slug,
  canonicalUrl,
  hasHeader,
  hasNewsletter,
  hasFooter,
  center,
  locale,
}: Props): JSX.Element => (
  <>
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        title: title,
        description: description,
        locale: `${locale === "pt-BR" ? "pt_BR" : "en_US"}`,
        images: [
          {
            url: `${urlThumbnail ? urlThumbnail : defaultImg}`,
            width: 1200,
            height: 630,
            alt: `${title}`,
            type: "image/png",
          },
        ],
        site_name: "🧠 Ruan Dias",
      }}
      canonical={canonicalUrl}
      twitter={{
        handle: "@ruandiax",
        site: "@ruandiax",
        cardType: "summary_large_image",
      }}
    />
    {hasHeader && <Header locale={locale} />}
    <motion.main
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ type: "linear" }}
      className={`${styles.main} ${center && styles.center}`}
    >
      {children}
    </motion.main>
    {hasFooter && <Footer />}
  </>
);

export default Layout;
