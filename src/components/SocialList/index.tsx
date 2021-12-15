/* eslint-disable @next/next/no-img-element */
import { motion, AnimatePresence } from "framer-motion";
import styles from "./styles.module.scss";

const links: { name: string; href: string; icon: string }[] = [
  {
    name: "Twiter",
    href: "https://twitter.com/ruandiax",
    icon: "twitter",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/ruandiax",
    icon: "instagram",
  },
  {
    name: "Github",
    href: "https://github.com/ruandiax",
    icon: "github",
  },
  {
    name: "Linkedin",
    href: "https://linkedin.com/in/ruandiax",
    icon: "linkedin",
  },
];

const SocialList = (): JSX.Element => {
  return (
    <div className={styles.socialMedia}>
      {links.map(({ name, href, icon }) => (
        <a href={href} key={name} target="_blank" rel="noreferrer" title={name}>
          <span className={styles.socialName}>{name}</span>

          <img src={`/icons/${icon}.svg`} width={22} height={22} alt={name} />
        </a>
      ))}
    </div>
  );
};

export default SocialList;
