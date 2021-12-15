import { AnimateSharedLayout } from "framer-motion";
import styles from "./styles.module.scss";
import Link from "next/link";
import content from "../../data/components.json";
import { motion } from "framer-motion";
import SocialList from "@components/SocialList";

const variants = {
  hidden: {
    opacity: 0,
    x: 0,
    y: 200,
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
};

type Props = {
  locale?: string | undefined;
};

const Footer = ({ locale }: Props): JSX.Element => {
  const localeContent = locale === "pt-BR" ? "pt-BR" : "en-US";
  const { pages, social, extra } = content.footer[localeContent];

  return (
    <motion.footer
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ type: "linear" }}
      className={styles.footer}
    >
      <SocialList />
    </motion.footer>
  );
};

export default Footer;
