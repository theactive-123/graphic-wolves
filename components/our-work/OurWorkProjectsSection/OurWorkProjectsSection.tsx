"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useViewportActivity } from "@/components/case-studies/useViewportActivity";
import Link from "next/link";
import { caseStudies } from "@/components/case-studies/data";
import styles from "./OurWorkProjectsSection.module.css";

const projects = caseStudies.map((study) => ({
  name: study.title,
  image:
    study.heroMedia.type === "image"
      ? study.heroMedia.src
      : study.heroMedia.poster,
  href: `/our-work/${study.slug}`,
}));

function ProjectRow({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className={styles.rowViewport}>
      <div className={`${styles.track} ${reverse ? styles.trackReverse : ""}`}>
        {[0, 1].map((copy) => (
          <div className={styles.group} key={copy} aria-hidden={copy === 1}>
            {projects.map((project, index) => (
              <Link
                className={styles.project}
                href={project.href}
                prefetch={false}
                tabIndex={copy === 1 ? -1 : undefined}
                key={`${project.name}-${project.image}-${index}`}
              >
                <span className={styles.imageWrap}>
                  <Image src={project.image} alt="" fill
                    sizes="(max-width: 700px) 50vw, 33vw"
                    loading="lazy" decoding="async" draggable={false} />
                </span>
                <span className={styles.projectTitle}>
                  <span className={styles.projectName}>{project.name}</span>
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OurWorkProjectsSection() {
  const { ref: sectionRef, inView, active } = useViewportActivity<HTMLElement>();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) setIsVisible(true);
  }, [inView]);

  return (
    <section ref={sectionRef} data-animating={active} className={styles.section} aria-label="Selected work projects">
      <div className={`${styles.content} ${isVisible ? styles.visible : ""}`}>
        <ProjectRow />
        <ProjectRow reverse />
      </div>
    </section>
  );
}