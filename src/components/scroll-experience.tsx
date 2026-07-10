"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const revealClass = "scroll-reveal";
const visibleClass = "scroll-reveal--visible";

export function ScrollExperience() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      return;
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section:not(.hero):not(.page-hero)")
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add(visibleClass);
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.08
      }
    );

    sections.forEach((section) => {
      section.classList.add(revealClass);

      const bounds = section.getBoundingClientRect();
      const isAlreadyVisible = bounds.top < window.innerHeight * 0.9 && bounds.bottom > 0;

      if (isAlreadyVisible) {
        section.classList.add(visibleClass);
      } else {
        observer.observe(section);
      }
    });

    return () => {
      observer.disconnect();
      sections.forEach((section) => section.classList.remove(revealClass, visibleClass));
    };
  }, [pathname]);

  return null;
}
