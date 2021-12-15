import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import { AnimateSharedLayout } from "framer-motion";
import CommandBar from "@components/CommandBar";

import * as gtag from "@lib/gtag";
import Analytics from "@components/Analytics";

function MyApp({ Component, pageProps, router }: AppProps) {
  const url = `https://ruandiax.dev${router.route}`;
  const myRouter = useRouter();
  const pageLocale = useRouter();
  const locale = pageLocale ? "pt-BR" : "en-US";

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };
    myRouter.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      myRouter.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [myRouter.events]);

  return (
    <CommandBar>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <meta name="theme-color" content="#020202" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={`Rychillie's blog feed`}
          href="/feed.xml"
        />
      </Head>
      <DefaultSeo
        titleTemplate="%s - Rychillie.net"
        openGraph={{
          title: "Future IOS Developer",
          description:
            "O website pessoal de Rychillie Umpierre de Oliveira, desenvolvedor.",
          images: [
            {
              url: "http://rychillie.net/api/thumbnail.png?imgdefault",
              width: 1200,
              height: 630,
              alt: "Future IOS Developer",
              type: "image/png",
            },
          ],
          site_name: "🦄 Rychillie",
          locale,
          url,
        }}
        twitter={{
          handle: "@rychillie",
          site: "@rychillie",
          cardType: "summary",
        }}
        canonical={url}
      />
      <AnimateSharedLayout>
        <Component {...pageProps} canonical={url} key={url} />
      </AnimateSharedLayout>
      <Analytics />
    </CommandBar>
  );
}
export default MyApp;
