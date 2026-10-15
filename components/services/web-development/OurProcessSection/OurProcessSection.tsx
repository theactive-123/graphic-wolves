import styles from "./OurProcessSection.module.css";

const processSteps = [
  {
    title: "Discovery & Strategy",
    description:
      "We define your audience, goals, and website requirements.",
  },
  {
    title: "Information Architecture",
    description:
      "We organize pages and content so visitors can find what they need.",
  },
  {
    title: "Wireframing",
    description:
      "We map page layouts, content hierarchy, and key calls to action.",
  },
  {
    title: "Copywriting",
    description:
      "We create clear website copy that explains your offer and guides visitors.",
  },
];

export default function OurProcessSection() {
  return (
    <section className={styles.section} aria-labelledby="web-process-heading">
      <div className={styles.inner}>
        <h2 id="web-process-heading" className={styles.sectionHeading}>
          Our Process
        </h2>

        <ol className={styles.processList}>
          {processSteps.map((step, index) => (
            <li className={styles.processRow} key={step.title}>
              <span className={styles.stepNumber}>{String(index + 1).padStart(2, "0")}</span>
              <h3 className={styles.stepHeading}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
