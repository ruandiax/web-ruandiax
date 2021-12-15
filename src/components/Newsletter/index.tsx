import styles from "./styles.module.scss";
import content from "../../data/components.json";

type NewsletterProps = {
  locale?: string;
};

const Newsletter = ({ locale }: NewsletterProps) => {
  const localeContent = locale === "pt-BR" ? "pt-BR" : "en-US";
  const {
    title,
    description,
    formName,
    formEmail,
    formSubmit,
    privacyStart,
    privacyTerms,
    privacyMiddle,
    privacyPolicy,
  } = content.newsletter[localeContent];

  return (
    <div className={styles.container}>
      <div className={styles.newsletter}>
        <h2>{title}</h2>
        <p>{description}</p>

        <div id="revue-embed">
          <form
            action="https://www.getrevue.co/profile/rychillie/add_subscriber"
            method="post"
            id="revue-form"
            name="revue-form"
            target="_blank"
          >
            <div className={styles.revueFormGroup}>
              <label htmlFor="member_email">{formEmail}.</label>
              <input
                className={styles.revueFormField}
                placeholder={formEmail}
                type="email"
                name="member[email]"
                id="member_email"
              />
            </div>
            <div className={styles.revueFormActions}>
              <input
                type="submit"
                value={formSubmit}
                name="member[subscribe]"
                id="member_submit"
              />
            </div>
          </form>
          <div className={styles.revueFormFooter}>
            {privacyStart}{" "}
            <a
              target="_blank"
              href="https://www.getrevue.co/terms"
              rel="noreferrer"
            >
              {privacyTerms}
            </a>{" "}
            {privacyMiddle}{" "}
            <a
              target="_blank"
              href="https://www.getrevue.co/privacy"
              rel="noreferrer"
            >
              {privacyPolicy}
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
