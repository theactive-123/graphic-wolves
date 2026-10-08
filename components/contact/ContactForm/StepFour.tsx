import styles from "./StepFour.module.css";

export default function StepFour() {
  return (
    <div className={styles.wrap}>
      <div className={styles.iconWrap} aria-hidden="true">
        <svg
          className={styles.successIcon}
          viewBox="0 0 96 96"
          fill="none"
          role="presentation"
        >
          <circle className={styles.iconCircle} cx="48" cy="48" r="39" />
          <path
            className={styles.iconCheck}
            d="m29 49 13 13 26-28"
          />
          <path className={styles.iconSparkle} d="M73 17v12m-6-6h12" />
        </svg>
      </div>

      <div className={styles.header}>
        <p className={styles.eyebrow}>PROJECT INQUIRY RECEIVED</p>
        <h2 className={styles.title}>Thanks for reaching out!</h2>
        <p className={styles.subtitle}>
          Your project details are with our team. We&apos;ll review your brief
          and get back to you soon to talk about what&apos;s next.
        </p>
      </div>

      <button
        className={styles.scheduleButton}
        type="button"
        aria-disabled="true"
        aria-describedby="schedule-call-note"
      >
        <span>Schedule a Call</span>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M5 12h14m-6-6 6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <p className={styles.buttonNote} id="schedule-call-note">
        Call scheduling will be available here soon.
      </p>
    </div>
  );
}
