"use client";

import styles from "./DevelopersLoveSection.module.css";

export default function DevelopersLoveSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>

        {/* ================================
            LEFT - WEBSITE PREVIEW
        ================================= */}

        <div className={styles.previewArea}>
          {/* Decorative background */}
          <div
            className={styles.previewBackground}
            aria-hidden="true"
          />

          {/* Image viewport */}
          <div className={styles.imageViewport}>
            <img
              src="/images/services/web-development/developers/website-preview.webp"
              alt="Website preview"
              className={styles.websiteImage}
            />
          </div>
        </div>


        {/* ================================
            RIGHT - CONTENT
        ================================= */}

        <div className={styles.content}>

          <h2 className={styles.heading}>
            Websites Built Around How Your Business Works
          </h2>

          <p className={styles.caption}>
            We build websites around your goals and audience, with a focus on usability, performance, and maintainability.
          </p>


          {/* ================================
              FEATURES
          ================================= */}

          <div className={styles.features}>

            {/* Feature 01 */}
            <div className={styles.feature}>

              <div className={styles.icon}>
                <img
                  src="/images/services/web-development/trustedicons/TreeStructure.svg"
                  alt="Custom web development"
                  width="28"
                  height="28"
                />
              </div>

              <h3 className={styles.featureHeading}>
                Custom Web Development
              </h3>

              <p className={styles.featureCaption}>
                Custom layouts, functionality, and integrations shaped around your business needs.
              </p>

            </div>


            {/* Feature 02 */}
            <div className={styles.feature}>

              <div className={styles.icon}>
                <img
                  src="/images/services/web-development/trustedicons/FingerprintSimple.svg"
                  alt="Performance-focused development"
                  width="28"
                  height="28"
                />
              </div>

              <h3 className={styles.featureHeading}>
                Performance-Focused Development
              </h3>

              <p className={styles.featureCaption}>
                Responsive layouts and efficient page experiences help your website work smoothly across devices.
              </p>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}