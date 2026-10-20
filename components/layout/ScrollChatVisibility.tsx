"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type ChatWindow = Window & {
  Tawk_API?: { showWidget?: () => void; hideWidget?: () => void };
};

export default function ScrollChatVisibility() {
  const pathname = usePathname();

  useEffect(() => {
    let visible = false;
    let frame = 0;
    document.documentElement.dataset.chatVisible = "false";
    (window as ChatWindow).Tawk_API?.hideWidget?.();

    const update = () => {
      frame = 0;
      const firstSection = document.querySelector("main section");
      const nextVisible = window.scrollY > 0 && (firstSection
        ? firstSection.getBoundingClientRect().bottom <= window.innerHeight * 0.8
        : window.scrollY >= window.innerHeight * 0.8);
      if (nextVisible === visible) return;
      visible = nextVisible;
      document.documentElement.dataset.chatVisible = String(visible);
      const api = (window as ChatWindow).Tawk_API;
      if (visible) api?.showWidget?.();
      else api?.hideWidget?.();
    };
    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(scheduleUpdate);
    const firstSection = document.querySelector("main section");
    if (firstSection) observer.observe(firstSection);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("lenis-scroll", scheduleUpdate);
    window.addEventListener("resize", scheduleUpdate);
    scheduleUpdate();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("lenis-scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      document.documentElement.dataset.chatVisible = "false";
      (window as ChatWindow).Tawk_API?.hideWidget?.();
    };
  }, [pathname]);

  return null;
}