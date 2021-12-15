import { AnimateSharedLayout } from "framer-motion";
import styles from "./styles.module.scss";
import Link from "@components/NoScrollLink";
import content from "../../data/components.json";

type Props = {
  locale?: string | undefined;
};

const Navigation = ({ locale }: Props): JSX.Element => {
  const localeContent = locale === "pt-BR" ? "pt-BR" : "en-US";
  const links = content.navigation[localeContent];

  return (
    <AnimateSharedLayout>
      <nav className={styles.navigation}>
        {links.map(({ name, href }) => (
          <Link key={name} href={href}>
            <a>{name}</a>
          </Link>
        ))}
      </nav>
    </AnimateSharedLayout>
  );
};

export default Navigation;
