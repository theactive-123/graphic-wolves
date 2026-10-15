"use client";

import styles from "./SmartIntegrationsSection.module.css";

const integrations = [
  {
    name: "Webflow",
    domain: "Webflow.com",
    icon: "/images/services/web-development/integration/webflow.svg",
    description:
      "We design high-performance Webflow sites that are easy to manage and ready to grow.",
    href: "https://webflow.com",
    position: "webflow",
  },
  {
    name: "Wix.com",
    domain: "Wix.com",
    icon: "/images/services/web-development/integration/wix.svg",
    description:
      "Flexible Wix websites with polished visuals, strong performance, and easy content management.",
    href: "https://www.wix.com",
    position: "wix",
  },
  {
    name: "Squarespace",
    domain: "Squarespace.com",
    icon: "/images/services/web-development/integration/squarespace.svg",
    description:
      "Distinctive Squarespace sites with responsive layouts and simple content management.",
    href: "https://www.squarespace.com",
    position: "squarespace",
  },
  {
    name: "Framer",
    domain: "Framer.com",
    icon: "/images/services/web-development/integration/framer.svg",
    description:
      "High-fidelity Framer sites with expressive motion and a smooth path to launch.",
    href: "https://www.framer.com",
    position: "framer",
  },
];

export default function SmartIntegrationsSection() {
  return (
    <section className={styles.section} aria-labelledby="integrations-title">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <h2 id="integrations-title" className={styles.heading}>
            Smart Integrations
          </h2>

          <p className={styles.caption}>
            We connect your website with relevant tools and platforms to support smoother workflows.
          </p>

          <div className={styles.includeBlock}>
            <h3 className={styles.includeHeading}>Integration Capabilities</h3>
            <ul className={styles.includeList}>
              <li>Third-party tools and service integrations</li>
              <li>Forms and lead capture workflows</li>
              <li>Content management tools</li>
              <li>Centralized website management</li>
            </ul>
            <a className={styles.seeMore} href="#integration-cards">
              See more...
            </a>
          </div>
        </div>

        <div className={styles.cardStage} id="integration-cards">
          {integrations.map((integration) => (
            <article
              key={integration.name}
              className={styles.card}
              data-position={integration.position}
            >
              <div className={styles.cardBrand}>
                <img
                  className={styles.cardIcon}
                  src={integration.icon}
                  alt={integration.name}
                  aria-hidden="true"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              
              </div>

              <h3 className={styles.cardHeading}>{integration.name}</h3>
              <p className={styles.cardCaption}>{integration.description}</p>
              <a
                className={styles.cardButton}
                href={integration.href}
                target="_blank"
                rel="noreferrer"
              >
                Read More...
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
