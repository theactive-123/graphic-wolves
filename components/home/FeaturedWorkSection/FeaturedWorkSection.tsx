"use client";

import CycleImage from "@/components/case-studies/ProjectImageCycle";
import { caseStudies, type CaseStudy } from "@/components/case-studies/data";

import styles from "./FeaturedWorkSection.module.css";

/* =========================================================
   IMAGE ARRAYS
========================================================= */

const slots = [
  "topLeftVertical", "topLeftHorizontal", "topRight", "middleTop",
  "middleBottom", "bottomLeft", "bottomRightTop", "bottomRightBottom",
] as const;

type Slot = (typeof slots)[number];
const categorySlots: Record<string, Slot[]> = {
  "Branding & Identity": ["topLeftVertical", "topLeftHorizontal", "middleBottom"],
  "E-commerce": ["topRight", "middleTop"],
  "Web Development": ["bottomLeft", "bottomRightTop", "bottomRightBottom"],
};

const workProjects = Object.fromEntries(
  slots.map((slot) => {
    const category = Object.keys(categorySlots).find((key) => categorySlots[key].includes(slot));
    const categoryProjects = caseStudies.filter((study) => study.category === category);
    const projects = categoryProjects.length ? categoryProjects : caseStudies;
    const offset = category ? categorySlots[category].indexOf(slot) : 0;
    return [slot, [...projects.slice(offset), ...projects.slice(0, offset)]];
  })
) as Record<Slot, CaseStudy[]>;

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function FeaturedWorkSection({ noOverlap = false }: { noOverlap?: boolean }) {
  return (
    <section
      className={
        `${styles.featuredSection} ${noOverlap ? styles.noOverlap : ""}`
      }
      aria-labelledby="featured-heading"
    >
      <div className={styles.panel}>
        <div
          className={
            styles.inner
          }
        >
        {/* =================================================
            HEADING
        ================================================= */}

        <h2
          id="featured-heading"
          className={
            styles.mainHeading
          }
        >
          <span>
            Featured
          </span>

          <span
            className={
              styles.work
            }
          >
            WORK

            <svg
              className={
                styles.headingLine
              }
              viewBox="0 0 340 42"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="
                  M4 25
                  C72 19 122 14 170 18
                  C201 21 215 25 192 27
                  C174 29 164 24 184 22
                  C224 19 269 20 336 24
                "
              />
            </svg>
          </span>
        </h2>

        {/* =================================================
            TOP LEFT VERTICAL
        ================================================= */}

        <div
          className={
            styles.topLeftVertical
          }
        >
          <CycleImage
            classNames={styles}
            projects={
              workProjects
                .topLeftVertical
            }
            interval={3200}
            width={330}
            height={395}
          />
        </div>

        {/* =================================================
            TOP LEFT HORIZONTAL
        ================================================= */}

        <div
          className={
            styles.topLeftHorizontal
          }
        >
          <CycleImage
            classNames={styles}
            projects={
              workProjects
                .topLeftHorizontal
            }
            interval={3700}
            width={360}
            height={205}
          />
        </div>

        {/* BRANDING */}

        <img
          src="/images/featured/badges/branding.svg"
          alt="Branding"
          width={160}
          height={56}
          loading="lazy"
          decoding="async"
          className={`${styles.badge} ${styles.brandingBadge}`}
        />

        {/* =================================================
            BRANDING LONG SWIRL
        ================================================= */}

        <svg
          className={
            styles.middleSwirl
          }
          viewBox="0 0 120 250"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="
              M12 5
              C54 15 84 44 82 78
              C80 106 59 124 40 114
              C23 105 30 83 46 79
              C73 73 99 99 100 135
              C102 176 84 216 58 243
            "
          />
        </svg>

        {/* =================================================
            TOP RIGHT GREEN
        ================================================= */}

        <img
          src="/images/featured/vectors/green-shape.svg"
          alt=""
          width={270}
          height={170}
          loading="lazy"
          decoding="async"
          className={
            styles.greenShape
          }
        />

        {/* TOP RIGHT IMAGE */}

        <div
          className={
            styles.topRight
          }
        >
          <CycleImage
            classNames={styles}
            projects={
              workProjects.topRight
            }
            interval={4100}
            width={380}
            height={250}
          />
        </div>

        {/* ECOMMERCE */}

        <img
          src="/images/featured/badges/ecommerce.svg"
          alt="E-Commerce"
          width={175}
          height={56}
          loading="lazy"
          decoding="async"
          className={`${styles.badge} ${styles.ecommerceBadge}`}
        />

        {/* =================================================
            MIDDLE TOP
        ================================================= */}

        <div
          className={
            styles.middleTop
          }
        >
          <CycleImage
            classNames={styles}
            projects={
              workProjects.middleTop
            }
            interval={3600}
            width={340}
            height={245}
          />
        </div>

        {/* =================================================
            MIDDLE BOTTOM
        ================================================= */}

        <div
          className={
            styles.middleBottom
          }
        >
          <CycleImage
            classNames={styles}
            projects={
              workProjects.middleBottom
            }
            interval={4300}
            width={330}
            height={260}
          />
        </div>

        {/* GREEN SMALL */}

        <img
          src="/images/featured/vectors/green-small.svg"
          alt=""
          width={95}
          height={95}
          loading="lazy"
          decoding="async"
          className={
            styles.greenSmall
          }
        />

        {/* =================================================
            BOTTOM LEFT PURPLE
        ================================================= */}

        <img
          src="/images/featured/vectors/purple-shape.svg"
          alt=""
          width={390}
          height={220}
          loading="lazy"
          decoding="async"
          className={
            styles.purpleShape
          }
        />

        {/* BOTTOM LEFT IMAGE */}

        <div
          className={
            styles.bottomLeft
          }
        >
          <CycleImage
            classNames={styles}
            projects={
              workProjects.bottomLeft
            }
            interval={3850}
            width={390}
            height={280}
          />
        </div>

        {/* WEB DEV */}

        <img
          src="/images/featured/badges/webdev.svg"
          alt="Web Development"
          width={155}
          height={56}
          loading="lazy"
          decoding="async"
          className={`${styles.badge} ${styles.webdevBadge}`}
        />

        {/* =================================================
            BOTTOM RIGHT TOP
        ================================================= */}

        <div
          className={
            styles.bottomRightTop
          }
        >
          <CycleImage
            classNames={styles}
            projects={
              workProjects
                .bottomRightTop
            }
            interval={4000}
            width={365}
            height={265}
          />
        </div>

        {/* =================================================
            BOTTOM MINI SWIRL
        ================================================= */}

        <svg
          className={
            styles.bottomSwirl
          }
          viewBox="0 0 120 90"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="
              M4 76
              C16 65 27 66 38 78
              C33 62 36 49 45 47
              C55 44 63 56 61 66
              C92 30 101 14 115 10
            "
          />
        </svg>

        {/* =================================================
            BOTTOM RIGHT BOTTOM
        ================================================= */}

        <div
          className={
            styles.bottomRightBottom
          }
        >
          <CycleImage
            classNames={styles}
            projects={
              workProjects
                .bottomRightBottom
            }
            interval={4550}
            width={430}
            height={250}
          />
        </div>
        </div>
      </div>
    </section>
  );
}