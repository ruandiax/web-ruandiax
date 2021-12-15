/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { AnimateSharedLayout } from "framer-motion";
import styles from "./styles.module.scss";
import Link from "next/link";
import Navigation from "@components/Navigation";

import { useKBar } from "kbar";

type Props = {
  locale?: string | undefined;
};

const Header = ({ locale }: Props): JSX.Element => {
  const { query } = useKBar();

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <Link href="/">
          <a className={styles.logo}>
           🧠 <span>Ruan Dias</span>
          </a>
        </Link>

        <button
          type="button"
          aria-label="Command"
          className={styles.menu}
          onClick={query.toggle}
        >
          <img src="/icons/command.svg" alt="menu" />
        </button>
      </nav>

      {/* <Navigation locale={locale} /> */}
    </header>
  );
};

export default Header;
