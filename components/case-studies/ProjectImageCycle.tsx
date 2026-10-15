"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "./data";
import { useViewportActivity } from "./useViewportActivity";

type CycleClasses = Readonly<Record<string, string>>;

export default function ProjectImageCycle({ projects, interval = 3500, width = 400, height = 300, classNames: styles }: {
  projects: CaseStudy[];
  interval?: number;
  width?: number;
  height?: number;
  classNames: CycleClasses;
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [loaded, setLoaded] = useState<Set<string>>(() => new Set());
  const { ref, inView, active } = useViewportActivity<HTMLDivElement>();
  const next = (current + 1) % projects.length;
  const previous = (current + projects.length - 1) % projects.length;
  const nextReady = loaded.has(projects[next]?.slug);

  useEffect(() => {
    if (projects.length <= 1 || paused || !active || !nextReady) return;
    const timer = window.setTimeout(() => setCurrent(next), interval);
    return () => window.clearTimeout(timer);
  }, [projects.length, paused, active, nextReady, next, interval]);

  return (
    <div ref={ref} className={styles.cycleInner}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={(event) => setPaused(event.currentTarget.contains(document.activeElement))}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(event.currentTarget.matches(":hover"));
      }}
    >
      {projects.map((study, index) => {
        // Keep the outgoing image for the fade and prepare only the next slide.
        if (index !== current && index !== previous && !(inView && index === next)) return null;
        return (
          <Link key={study.slug} href={`/our-work/${study.slug}`} prefetch={false}
            aria-label={`View ${study.title} - ${study.category}`}
            aria-hidden={current !== index} tabIndex={current === index ? 0 : -1}
            className={`${styles.projectLink} ${current === index ? styles.activeProject : ""}`}
          >
            <Image src={study.heroMedia.type === "image" ? study.heroMedia.src : study.heroMedia.poster}
              alt={study.heroMedia.alt} width={width} height={height}
              sizes="(max-width: 767px) calc(100vw - 36px), 460px"
              loading={inView ? "eager" : "lazy"} decoding="async" draggable={false}
              onLoad={() => setLoaded((known) => known.has(study.slug) ? known : new Set(known).add(study.slug))}
              className={`${styles.cycleImage} ${current === index ? styles.activeImage : ""}`}
            />
          </Link>
        );
      })}
    </div>
  );
}
