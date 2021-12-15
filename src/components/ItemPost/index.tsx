import styles from "./styles.module.scss";
import { parseISO, format } from "date-fns";
import { enUS, ptBR } from "date-fns/locale";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  date: string;
  locale: "en-US" | string;
  timeToRead?: string;
  notDefault?: boolean;
  hasBanner?: boolean;
  link?: string;
};

const ItemPost = ({
  title,
  slug,
  description,
  thumbnailUrl,
  notDefault,
  hasBanner,
  link,
  date,
  locale,
  timeToRead,
}: Props): JSX.Element => {
  const postLocale = locale === "pt-BR" ? "/pt-BR" : "";
  const dateLocale = locale === "pt-BR" ? ptBR : enUS;

  if (!notDefault) {
    return (
      <Link href={`${postLocale}/blog/${slug}`}>
        <a className={styles.itemPost}>
          <div className={styles.itemHeader}>
            <h3>{title}</h3>
            <div className={styles.details}>
              <span>
                {format(parseISO(date), "MMMM dd, yyyy", {
                  locale: dateLocale,
                })}
              </span>
              &bull;
              <span>{timeToRead}</span>
            </div>
          </div>
          <p>{description}</p>
        </a>
      </Link>
    );
  } else {
    return (
      <a
        href={`${link}`}
        target="_blank"
        className={styles.itemPost}
        rel="noreferrer"
      >
        {hasBanner ? (
          <div className={styles.imageContainer}>
            <Image
              src={thumbnailUrl}
              alt={title}
              width={728}
              height={360}
              layout="fixed"
            />
          </div>
        ) : null}
        <div className={styles.itemHeader}>
          <h3>{title}</h3>

          <span>
            {format(parseISO(date), "MMMM dd, yyyy", { locale: dateLocale })}
          </span>
        </div>
        <p>{description}</p>
      </a>
    );
  }
};

export default ItemPost;
