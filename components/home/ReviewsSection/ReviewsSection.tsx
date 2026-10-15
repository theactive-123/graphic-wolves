"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./ReviewsSection.module.css";

gsap.registerPlugin(ScrollTrigger);

const reviewLogos = [
  "/images/reviews/reviews-logo/1.webp",
  "/images/reviews/reviews-logo/2.webp",
  "/images/reviews/reviews-logo/3.webp",
  "/images/reviews/reviews-logo/4.webp",
  "/images/reviews/reviews-logo/5.webp",
  "/images/reviews/reviews-logo/6.webp",
  "/images/reviews/reviews-logo/7.webp",
  "/images/reviews/reviews-logo/8.webp",
  "/images/reviews/reviews-logo/9.webp"
];


const reviews = [
  {
    quote:
      "They understood the vision and made the whole brand feel more clear, consistent, and true to the product.",
    name: "MaryBeth",
    role: "Product Designer",
    brand: "APPCUES",
    bg: "#EDFFC5",
    x: "7%",
    lane: "left",
  },
  {
    quote:
      "I wanted a brand people could trust, and the final result feels professional, clear, and right for our business.",
    name: "Abdul Rahman",
    role: "Owner",
    brand: "ALPHACHAIN",
    bg: "#D2DDFF",
    x: "54%",
    lane: "center",
  },
  {
    quote:
      "They brought my ideas together in a way that feels cohesive and much closer to what I had imagined.",
    name: "Lara",
    role: "Founder",
    brand: "TWIRL",
    bg: "#EDFFC5",
    x: "78%",
    lane: "right",
  },
  {
    quote:
      "We wanted a website that was simple to use, and the final design makes everything easier to understand.",
    name: "Amari Robinson",
    role: "Co-Founder",
    brand: "TUTORTODAY",
    bg: "#FBE6FF",
    x: "18%",
    lane: "left",
  },
  {
    quote:
      "The website feels personal and professional, making it easier for people to understand my work and connect with me.",
    name: "Brian William",
    role: "Founder & Speaker",
    brand: "BW SPEAKS",
    bg: "#F2F2F2",
    x: "72%",
    lane: "right",
  },
  {
    quote:
      "The store presents our products beautifully and makes the shopping experience feel simple and straightforward.",
    name: "Tod Key",
    role: "Founder",
    brand: "THERMOLAB",
    bg: "#D2DDFF",
    x: "8%",
    lane: "left",
  },
  {
    quote:
      "We wanted shopping to feel effortless, and the website brings that idea to life with a clean, friendly experience.",
    name: "Alexander Dijkema",
    role: "Founder",
    brand: "HEYBUDDY",
    bg: "#F2F2F2",
    x: "43%",
    lane: "center",
  },
  {
    quote:
      "The design captures our brand's energy while making it easy for customers to explore our products.",
    name: "Lauro Ramires",
    role: "Owner",
    brand: "PEAK MOTION",
    bg: "#EDFFC5",
    x: "76%",
    lane: "right",
  },
  {
    quote:
      "The website gives our products the clean, premium presentation we wanted while keeping everything easy to navigate.",
    name: "Alex Spago",
    role: "Business Owner",
    brand: "DERMALYFT",
    bg: "#FBE6FF",
    x: "22%",
    lane: "left",
  },
];


const clamp = (value: number, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

export default function ReviewsSection({
  showHeading = false,
}: {
  showHeading?: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  const introRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const youngCircleRef = useRef<SVGPathElement>(null);
  const underlineRef = useRef<SVGPathElement>(null);

  const stickyWrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const otherSayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const intro = introRef.current;
    const heading = headingRef.current;
    const stickyWrap = stickyWrapRef.current;
    const stage = stageRef.current;
    const otherSay = otherSayRef.current;

    if (
      !section ||
      !intro ||
      !heading ||
      !stickyWrap ||
      !stage ||
      !otherSay
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const cards =
        gsap.utils.toArray<HTMLElement>(
          "[data-review-card]"
        );

      /* =========================================
         CIRCLE PREP
      ========================================= */

      if (youngCircleRef.current) {
        const length =
          youngCircleRef.current.getTotalLength();

        gsap.set(youngCircleRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      }

      /* =========================================
         SWIRL PREP
      ========================================= */

      if (underlineRef.current) {
        const length =
          underlineRef.current.getTotalLength();

        gsap.set(underlineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      }

      /* =========================================
         INTRO HEADING
      ========================================= */

      gsap.set(heading, {
        y: 70,
        opacity: 0,
      });

      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: intro,
          start: "top 78%",
          end: "center 42%",
          scrub: 1,
        },
      });

      headingTl.to(heading, {
        y: 0,
        opacity: 1,
        duration: 0.55,
        ease: "power3.out",
      });

      if (youngCircleRef.current) {
        headingTl.to(
          youngCircleRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.3,
            ease: "power2.inOut",
          },
          0.3
        );
      }

      if (underlineRef.current) {
        headingTl.to(
          underlineRef.current,
          {
            strokeDashoffset: 0,
            duration: 0.35,
            ease: "power2.inOut",
          },
          0.48
        );
      }

      /* =========================================
         OTHER SAY
      ========================================= */

      gsap.set(otherSay, {
        opacity: 0,
        y: 22,
      });

      gsap.to(otherSay, {
        opacity: 1,
        y: 0,

        ease: "none",

        scrollTrigger: {
          trigger: stickyWrap,
          start: "top 75%",
          end: "top 35%",
          scrub: 1,
        },
      });

      /* =========================================
         TESTIMONIAL INITIAL STATE
      ========================================= */

      cards.forEach((card, index) => {
        gsap.set(card, {
          y: window.innerHeight * 0.72,

          opacity: 0,

          scale: 0.96,

          rotate:
            index % 2 === 0
              ? -1.4
              : 1.4,
        });
      });

      /* =========================================
         MAIN SCROLL CONTROLLER

         NO GSAP PIN.
         CSS STICKY HANDLES STICKINESS.
      ========================================= */

      ScrollTrigger.create({
        trigger: stickyWrap,

        start: "top top",

        end: "bottom bottom",

        scrub: true,

        invalidateOnRefresh: true,

        onUpdate: (self) => {
          const masterProgress =
            self.progress;

          cards.forEach(
            (card, index) => {
              /*
                Each testimonial gets its own
                small delayed window.
              */

              const stagger = 0.095;

              const cardStart =
                index * stagger;

              const cardDuration =
                0.46;

              const localProgress =
                clamp(
                  (
                    masterProgress -
                    cardStart
                  ) /
                    cardDuration
                );

              /*
                Smooth easing manually.
              */

              const smooth =
                localProgress *
                localProgress *
                (
                  3 -
                  2 *
                    localProgress
                );

              /*
                Vertical:

                0     = below screen
                0.5   = visible / center
                1     = above screen
              */

              const viewportHeight =
                window.innerHeight;

              const startY =
                viewportHeight *
                0.72;

              const endY =
                -viewportHeight *
                0.82;

              const y =
                startY +
                (
                  endY -
                  startY
                ) *
                  smooth;

              /* =============================
                 LEFT / CENTER / RIGHT FLOAT
              ============================= */

              const lane =
                card.dataset.lane;

              let xWave = 0;

              /*
                Small curved movement rather
                than straight vertical.
              */

              const wave =
                Math.sin(
                  localProgress *
                    Math.PI
                );

              const viewportWidth = window.innerWidth;
              const waveAmount =
                viewportWidth < 600 ? 10 : viewportWidth < 900 ? 20 : 38;

              if (lane === "left") {
                xWave =
                  wave * waveAmount;
              }

              if (lane === "center") {
                xWave =
                  Math.sin(
                    localProgress *
                      Math.PI *
                      2
                  ) * (waveAmount * 0.6);
              }

              if (lane === "right") {
                xWave =
                  wave * -waveAmount;
              }

              /* =============================
                 OPACITY

                 fade in -> full -> fade out
              ============================= */

              let opacity = 1;

              if (
                localProgress <
                0.15
              ) {
                opacity =
                  localProgress /
                  0.15;
              }

              if (
                localProgress >
                0.82
              ) {
                opacity =
                  1 -
                  (
                    localProgress -
                    0.82
                  ) /
                    0.18;
              }

              opacity =
                clamp(opacity);

              /* =============================
                 SCALE
              ============================= */

              const scale =
                0.96 +
                Math.sin(
                  localProgress *
                    Math.PI
                ) *
                  0.04;

              /* =============================
                 ROTATE
              ============================= */

              const baseRotate =
                index % 2 === 0
                  ? -1.2
                  : 1.2;

              const rotate =
                baseRotate +
                Math.sin(
                  localProgress *
                    Math.PI
                ) *
                  (
                    index % 2 ===
                    0
                      ? 1
                      : -1
                  );

              gsap.set(card, {
                y,
                x: xWave,

                opacity,

                scale,

                rotate,
              });
            }
          );
        },
      });

      ScrollTrigger.refresh();
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={
        styles.reviewsSection
      }
      aria-labelledby="reviews-main-heading"
    >
      {/* =====================================
          PURPLE SHADOW
      ===================================== */}

      <div
        className={
          styles.purpleShadow
        }
        aria-hidden="true"
      />

      {/* =====================================
          SECTION 1 — HEADING
      ===================================== */}

      <div
        ref={introRef}
        className={
          `${styles.introSection} ${
            showHeading ? "" : styles.introSectionHidden
          }`
        }
      >
        <h2
          ref={headingRef}
          id="reviews-main-heading"
          className={
            styles.mainHeading
          }
        >
          <span>
            We are a{" "}
          </span>

          {/* YOUNG */}

          <span
            className={
              styles.youngWrap
            }
          >
            <em>
              young,
            </em>

            <svg
              className={
                styles.youngCircle
              }
              viewBox="0 0 290 120"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                ref={
                  youngCircleRef
                }
                d="
                  M12 66
                  C28 16 241 6 276 50
                  C302 82 262 104 151 106
                  C65 108 12 91 12 66
                "
              />
            </svg>
          </span>

          <span>
            {" "}
            future-proof
          </span>

          <br />
          {" "}
          <strong className={styles.designDevelopment}>
            Design and Development
          </strong>
          {" "}
          <br />

          <span>
            team of 42 digitally
            native{" "}
          </span>

          <br />

          {/* UNDERKINDER */}

          <span
            className={
              styles.underWrap
            }
          >
            <em>
              underkinder.
            </em>

            <svg
              className={
                styles.underLine
              }
              viewBox="0 0 560 48"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                ref={
                  underlineRef
                }
                d="
                  M5 27

                  C92 18 165 14 238 20

                  C284 24 316 30 350 27

                  C371 25 381 20 365 18

                  C347 16 330 21 347 25

                  C386 33 449 27 555 22
                "
              />
            </svg>
          </span>

          <span>
            {" "}
            Not to brag!
          </span>

          <img
            src="/images/reviews/thumb-sticker.svg"
            alt=""
            className={
              styles.headingSticker
            }
          />
        </h2>
      </div>

      {/* =====================================
          SECTION 2 — REVIEWS
      ===================================== */}

      <div
        ref={stickyWrapRef}
        className={
          styles.stickyWrap
        }
      >
        <div
          ref={stageRef}
          className={
            styles.reviewsStage
          }
        >
          {/* OTHER SAY */}

          <div
            ref={otherSayRef}
            className={
              styles.otherSay
            }
          >
            [ Other say ]
          </div>

          {/* =================================
              MARQUEE
          ================================= */}

          <div
            className={
              styles.marquee
            }
            aria-hidden="true"
          >
            <div
              className={
                styles.marqueeTrack
              }
            >
              {[0, 1].map((copy) => (
                <div className={styles.logoGroup} key={copy}>
                  {reviewLogos.map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt=""
                      width={180}
                      height={90}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className={styles.marqueeLogo}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* =================================
              TESTIMONIALS
          ================================= */}

          <div
            className={
              styles.cardsLayer
            }
          >
            {reviews.map(
              (
                review,
                index
              ) => (
                <article
                  key={`${review.name}-${index}`}
                  data-review-card
                  data-lane={
                    review.lane
                  }
                  className={
                    styles.reviewCard
                  }
                  style={{
                    left:
                      review.x,

                    background:
                      review.bg,
                  }}
                >
                  <p
                    className={
                      styles.quote
                    }
                  >
                    “
                    {
                      review.quote
                    }
                    ”
                  </p>

                  <div
                    className={
                      styles.divider
                    }
                  />

                  <div
                    className={
                      styles.personInfo
                    }
                  >
                    <div
                      className={
                        styles.nameRow
                      }
                    >
                      <span
                        className={
                          styles.name
                        }
                      >
                        {
                          review.name
                        }
                      </span>

                      <img
                        src="/images/reviews/verified-badge.svg"
                        alt=""
                        className={
                          styles.verified
                        }
                      />
                    </div>

                    <span
                      className={
                        styles.role
                      }
                    >
                      {
                        review.role
                      }
                    </span>

                    <span
                      className={
                        styles.role
                      }
                    >
                      {
                        review.brand
                      }
                    </span>
                  </div>
                </article>
              )
            )}
          </div>
          <div
            className={styles.reviewShadow1}
            aria-hidden="true"
          />
        </div>
      </div>
      <div className={styles.reviewShadow}></div>
    </section>
  );
}