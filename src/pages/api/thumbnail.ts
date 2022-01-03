/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from "next";
import { getScreenshot } from "@lib/chromium";
import { getHtml } from "@lib/thumbnailTemplate";
import { parseISO, format } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";

const isDev = !process.env.AWS_REGION;
const isHtmlDebug = process.env.OG_HTML_DEBUG === "1";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> => {
  try {
    const query = req.query;

    const baseURL = "https://ruandiax.dev";

    const imgDefault = String(query.defaultImg);
    const title = String(query.title);
    const slug = String(query.slug);
    const itemLang = String(query.lang);
    const dateLocale = itemLang === "pt-BR" ? ptBR : enUS;
    const date = format(parseISO(String(query.date)), "MMMM dd, yyyy", {
      locale: dateLocale,
    });
    const readTime = String(query.readTime);
    const linkURL =
      itemLang === "pt-BR" ? `${baseURL}/pt-BR/${slug}` : `${baseURL}/${slug}`;

    const DefaultThumb = imgDefault ? true : false;

    if (!title) {
      throw new Error("Title is required");
    }

    //http://localhost:3000/api/thumbnail.png?title=test&slug=test&lang=pt-BR
    const html = getHtml({ title, linkURL, DefaultThumb, date, readTime });

    if (isHtmlDebug) {
      res.setHeader("Content-Type", "text/html");
      res.end(html);

      return;
    }

    const file = await getScreenshot(html, isDev);

    res.statusCode = 200;

    res.setHeader("Content-Type", `image/png`);
    res.setHeader(
      "Cache-Control",
      "public, immutable, no-transform, s-maxage=31536000, max-age=31536000"
    );

    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
};
