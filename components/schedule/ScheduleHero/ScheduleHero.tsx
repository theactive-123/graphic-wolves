import Link from "next/link";
import styles from "./ScheduleHero.module.css";

export default function ScheduleHero() {
  return (
    <section className={styles.section} aria-labelledby="schedule-heading">
      <div className={styles.content}>
        <div className={styles.breadcrumb}>
          <Link href="/contact" className={styles.breadcrumbMuted}>
            Contact
          </Link>
          <span className={styles.breadcrumbDivider} aria-hidden="true" />
          <span className={styles.breadcrumbActive}>Schedule a Call</span>
        </div>

        <h1 id="schedule-heading" className={styles.heading}>
          Let&apos;s make time for
          <br />
          <span className={styles.highlight}>what&apos;s next.</span>
        </h1>

        <p className={styles.caption}>
          Choose a time that works for you. We&apos;ll talk through your goals,
          answer your questions, and explore how we can help.
        </p>
      </div>
    </section>
  );
}
