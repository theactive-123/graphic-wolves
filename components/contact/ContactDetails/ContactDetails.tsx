import styles from "./ContactDetails.module.css";

const contactCards = [
  {
    label: "Call us",
    value: "+1 (832) 452-3473",
    href: "tel:+18324523473",
    description: "Let’s talk about what you’re building.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M7.2 3.5h2.5l1.2 4.2-1.8 1.7a14.2 14.2 0 0 0 5.5 5.5l1.7-1.8 4.2 1.2v2.5a2 2 0 0 1-2.2 2A15.6 15.6 0 0 1 5.2 5.7a2 2 0 0 1 2-2.2Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Email us",
    value: "info@graphicwolves.com",
    href: "mailto:info@graphicwolves.com",
    description: "Send us a note and we’ll get back to you.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect
          x="3.5"
          y="5"
          width="17"
          height="14"
          rx="2.5"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="m4.5 7 7.5 6 7.5-6"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Our location",
    value: "United States",
    href: "https://maps.google.com/?q=United+States",
    description: "Working with ambitious teams everywhere.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M19 10.2c0 5-7 10.3-7 10.3S5 15.2 5 10.2a7 7 0 1 1 14 0Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <circle
          cx="12"
          cy="10"
          r="2.2"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
    ),
  },
];

export default function ContactDetails() {
  return (
    <section className={styles.section} aria-label="Contact information">
      <div className={styles.grid}>
        {contactCards.map((card) => (
          <a
            key={card.label}
            className={styles.card}
            href={card.href}
            target={card.label === "Our location" ? "_blank" : undefined}
            rel={card.label === "Our location" ? "noopener noreferrer" : undefined}
          >
            <span className={styles.icon}>{card.icon}</span>
            <span className={styles.label}>{card.label}</span>
            <span className={styles.value}>{card.value}</span>
            <span className={styles.description}>{card.description}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
