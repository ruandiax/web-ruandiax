/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import * as React from "react";
import { useRouter } from "next/router";
import {
  KBarAnimator,
  KBarProvider,
  KBarPortal,
  useMatches,
  useDeepMatches,
  KBarPositioner,
  KBarSearch,
  KBarResults,
} from "kbar";
import styles from "./styles.module.scss";

interface BaseAction {
  icon?: any;
  id?: string;
  name?: string;
  shortcut?: string[];
  keywords?: string;
  perform?: () => void;
  section?: string;
  children?: React.ReactNode;
  //   parent?: ActionId | null;
}

export default function CommandBar({ children }: BaseAction) {
  const router = useRouter();

  const actions = [
    {
      id: "copy",
      name: "Copy URL",
      shortcut: ["u"],
      keywords: "copy-url",
      section: "General",
      perform: () => navigator.clipboard.writeText(window.location.href),
      icon: <img src="/icons/copy.svg" className={styles.iconStyle} />,
    },
    {
      id: "email",
      name: "Send Email",
      shortcut: ["e"],
      keywords: "send-email",
      section: "General",
      perform: () => window.open("mailto:ruandiax.dev@gmail.com", "_blank"),
      icon: <img src="/icons/mail.svg" className={styles.iconStyle} />,
    },
    {
      id: "home",
      name: "Home",
      shortcut: ["g", "h"],
      keywords: "go-home",
      section: "Go To",
      perform: () => router.push("/"),
      icon: <img src="/icons/home.svg" className={styles.iconStyle} />,
    },
    {
      id: "about",
      name: "About",
      shortcut: ["g", "a"],
      keywords: "go-about",
      section: "Go To",
      perform: () => router.push("/about"),
      icon: <img src="/icons/person.svg" className={styles.iconStyle} />,
    },
    {
      id: "articles",
      name: "Articles",
      shortcut: ["g", "b"],
      keywords: "go-articles",
      section: "Go To",
      perform: () => router.push("/blog"),
      icon: <img src="/icons/text.svg" className={styles.iconStyle} />,
    },
    {
      id: "projects",
      name: "Projects",
      shortcut: ["g", "p"],
      keywords: "go-projects",
      section: "Go To",
      perform: () => router.push("/work"),
      icon: <img src="/icons/bulb.svg" className={styles.iconStyle} />,
    },
    {
      id: "uses",
      name: "Uses",
      shortcut: ["g", "u"],
      keywords: "go-uses",
      section: "Go To",
      perform: () => router.push("/uses"),
      icon: <img src="/icons/desktop.svg" className={styles.iconStyle} />,
    },
    {
      id: "github",
      name: "Github",
      shortcut: ["f", "g"],
      keywords: "fallow-github",
      section: "Follow",
      perform: () => window.open("https://github.com/ruandiax", "_blank"),
      icon: <img src="/icons/github.svg" className={styles.iconStyle} />,
    },
    {
      id: "twitter",
      name: "Twitter",
      shortcut: ["f", "t"],
      keywords: "fallow-twitter",
      section: "Follow",
      perform: () => window.open("https://twitter.com/ruandiax", "_blank"),
      icon: <img src="/icons/twitter.svg" className={styles.iconStyle} />,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      shortcut: ["f", "l"],
      keywords: "fallow-linkedin",
      section: "Follow",
      perform: () => window.open("https://linkedin.com/in/ruandiax", "_blank"),
      icon: <img src="/icons/linkedin.svg" className={styles.iconStyle} />,
    },
    {
      id: "instagram",
      name: "Instagram",
      shortcut: ["f", "i"],
      keywords: "fallow-instagram",
      section: "Follow",
      perform: () => window.open("https://instagram.com/ruandiax", "_blank"),
      icon: <img src="/icons/instagram.svg" className={styles.iconStyle} />,
    },
  ];

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className={styles.positionerStyle}>
          <KBarAnimator className={styles.animatorStyle}>
            <KBarSearch
              className={styles.searchStyle}
              placeholder="Type a command or search…"
            />
            <RenderResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>

      {children}
    </KBarProvider>
  );
}

function RenderResults() {
  const { results } = useDeepMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className={styles.groupNameStyle}>{item}</div>
        ) : (
          <ResultItem action={item} active={active} />
        )
      }
    />
  );
}

type Props = {
  action: BaseAction;
  active: boolean;
};

const ResultItem = React.forwardRef(
  ({ action, active }: Props, ref: React.Ref<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        className={styles.resultStyle}
        style={{
          background: active
            ? "rgba(255, 255, 255, 0.1)"
            : "rgba(255, 255, 255, 0.05)",
          color: active ? "#f2f2f2" : "#8f9ba8",
        }}
      >
        <div className={styles.actionStyle}>
          {action.icon && action.icon}
          <div className={styles.actionRowStyle}>
            <span>{action.name}</span>
          </div>
        </div>
        {action.shortcut?.length ? (
          <div aria-hidden className={styles.shortcutStyle}>
            {action.shortcut.map((shortcut: any) => (
              <kbd key={shortcut} className={styles.kbdStyle}>
                {shortcut}
              </kbd>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);

// function ResultItem(action: any, active: boolean, ref?: any) {
//   return (
//     <div
//       ref={ref}
//       className={styles.resultStyle}
//       style={{
//         background: active
//           ? "rgba(255, 255, 255, 0.1)"
//           : "rgba(255, 255, 255, 0.05)",
//         color: active ? "#f2f2f2" : "#8f9ba8",
//       }}
//     >
//       <div className={styles.actionStyle}>
//         {action.icon && action.icon}
//         <div className={styles.actionRowStyle}>
//           <span>{action.name}</span>
//         </div>
//       </div>
//       {action.shortcut?.length ? (
//         <div aria-hidden className={styles.shortcutStyle}>
//           {action.shortcut.map((shortcut: any) => (
//             <kbd key={shortcut} className={styles.kbdStyle}>
//               {shortcut}
//             </kbd>
//           ))}
//         </div>
//       ) : null}
//     </div>
//   );
// }
