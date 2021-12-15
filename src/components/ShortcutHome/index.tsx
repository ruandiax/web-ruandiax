import { useState, useEffect } from "react";
import { useKBar } from "kbar";
import content from "../../data/components.json";
import styles from "./styles.module.scss";

type Props = {
  locale?: string;
};

export default function ShortcutHome({ locale }: Props) {
  const { query } = useKBar();
  const [mounted, setMounted] = useState(false);
  const localeContent = locale === "pt-BR" ? "pt-BR" : "en-US";
  const { isMbl, isDkt } = content.shortCutHome[localeContent];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    const isMac = /(Mac)/i.test(navigator.userAgent);
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);

    if (isMobile) {
      return (
        <button className={styles.btnWelcome} onClick={query.toggle}>
          {isMbl}
        </button>
      );
    } else if (isMac) {
      return (
        <button className={styles.btnWelcome} onClick={query.toggle}>
          {isDkt.press} <kbd>⌘</kbd> <kbd>K</kbd> {isDkt.toStart}
        </button>
      );
    } else {
      return (
        <button className={styles.btnWelcome} onClick={query.toggle}>
          {isDkt.press} <kbd>ctrl</kbd> <kbd>K</kbd> {isDkt.toStart}
        </button>
      );
    }
  }

  return <div />;
}
