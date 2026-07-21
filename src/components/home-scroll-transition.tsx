"use client";

import Lenis from "lenis";
import { useEffect } from "react";

const heroSelector = "[data-home-transition-hero]";
const stageSelector = "[data-home-transition-stage]";
const aboutSelector = "[data-home-transition-about]";
const heroProperties = [
  "--home-hero-content-x",
  "--home-hero-content-opacity",
  "--home-hero-image-scale",
  "--home-hero-image-saturation",
  "--home-hero-image-brightness",
  "--home-hero-overlay-opacity",
  "--home-wash-scale",
  "--home-chapter-x",
  "--home-chapter-opacity",
  "--home-chapter-logo-opacity",
  "--home-chapter-logo-x",
  "--home-chapter-rule"
];
const aboutProperties = [
  "--home-intro-y",
  "--home-intro-opacity",
  "--home-card-y",
  "--home-card-scale",
  "--home-card-opacity"
];

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

function smoothstep(value: number) {
  const boundedValue = clamp(value);
  return boundedValue * boundedValue * (3 - 2 * boundedValue);
}

export function HomeScrollTransition() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(heroSelector);
    const stage = document.querySelector<HTMLElement>(stageSelector);
    const about = document.querySelector<HTMLElement>(aboutSelector);

    if (!hero || !stage || !about) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointerQuery = window.matchMedia("(pointer: fine)");
    let lenis: Lenis | null = null;
    let nativeAnimationFrame: number | null = null;
    let transitionState = "";
    let aboutRevealState = "";

    const updateTransition = (scrollPosition: number) => {
      const stickyTop = Number.parseFloat(window.getComputedStyle(stage).top) || 0;
      const transitionStart = Math.max(0, hero.offsetTop - stickyTop);
      const transitionDistance = Math.max(1, hero.offsetHeight - stage.offsetHeight);
      const progress = clamp((scrollPosition - transitionStart) / transitionDistance);
      const contentExit = smoothstep(progress / 0.38);
      const imageFade = smoothstep((progress - 0.08) / 0.62);
      const whiteWash = smoothstep((progress - 0.18) / 0.5);
      const chapterEntrance = smoothstep((progress - 0.38) / 0.34);
      const chapterLogoEntrance = smoothstep((progress - 0.52) / 0.3);

      hero.style.setProperty("--home-hero-content-x", `${(-72 * contentExit).toFixed(2)}vw`);
      hero.style.setProperty("--home-hero-content-opacity", (1 - contentExit).toFixed(4));
      hero.style.setProperty("--home-hero-image-scale", (1 + 0.035 * imageFade).toFixed(4));
      hero.style.setProperty(
        "--home-hero-image-saturation",
        (1 - 0.72 * imageFade).toFixed(4)
      );
      hero.style.setProperty(
        "--home-hero-image-brightness",
        (1 + 0.38 * imageFade).toFixed(4)
      );
      hero.style.setProperty("--home-hero-overlay-opacity", (1 - imageFade).toFixed(4));
      hero.style.setProperty("--home-wash-scale", whiteWash.toFixed(4));
      hero.style.setProperty("--home-chapter-x", `${(46 * (1 - chapterEntrance)).toFixed(2)}vw`);
      hero.style.setProperty("--home-chapter-opacity", chapterEntrance.toFixed(4));
      hero.style.setProperty("--home-chapter-logo-opacity", chapterLogoEntrance.toFixed(4));
      hero.style.setProperty(
        "--home-chapter-logo-x",
        `${(34 * (1 - chapterLogoEntrance)).toFixed(2)}px`
      );
      hero.style.setProperty("--home-chapter-rule", chapterEntrance.toFixed(4));

      const aboutRevealDistance = Math.max(1, window.innerHeight * 0.5);
      const aboutProgress = smoothstep(
        (window.innerHeight - about.getBoundingClientRect().top) / aboutRevealDistance
      );
      const cardProgress = smoothstep((aboutProgress - 0.12) / 0.88);

      about.style.setProperty("--home-intro-y", `${(42 * (1 - aboutProgress)).toFixed(2)}px`);
      about.style.setProperty("--home-intro-opacity", aboutProgress.toFixed(4));
      about.style.setProperty("--home-card-y", `${(58 * (1 - cardProgress)).toFixed(2)}px`);
      about.style.setProperty("--home-card-scale", (0.985 + 0.015 * cardProgress).toFixed(4));
      about.style.setProperty("--home-card-opacity", cardProgress.toFixed(4));

      const nextState = progress <= 0 ? "ready" : progress >= 1 ? "complete" : "moving";

      if (nextState !== transitionState) {
        transitionState = nextState;
        hero.dataset.homeTransitionState = nextState;
        about.dataset.homeTransitionState = nextState;
      }

      const nextAboutRevealState =
        aboutProgress <= 0 ? "ready" : aboutProgress >= 1 ? "complete" : "moving";

      if (nextAboutRevealState !== aboutRevealState) {
        aboutRevealState = nextAboutRevealState;
        about.dataset.homeRevealState = nextAboutRevealState;
      }
    };

    const scheduleNativeUpdate = () => {
      if (nativeAnimationFrame !== null) {
        return;
      }

      nativeAnimationFrame = window.requestAnimationFrame(() => {
        nativeAnimationFrame = null;
        updateTransition(window.scrollY);
      });
    };

    const deactivate = () => {
      lenis?.destroy();
      lenis = null;
      window.removeEventListener("scroll", scheduleNativeUpdate);
      window.removeEventListener("resize", scheduleNativeUpdate);
      document.documentElement.classList.remove("home-lenis-active");

      if (nativeAnimationFrame !== null) {
        window.cancelAnimationFrame(nativeAnimationFrame);
        nativeAnimationFrame = null;
      }

      delete hero.dataset.homeTransition;
      delete hero.dataset.homeTransitionEngine;
      delete hero.dataset.homeTransitionState;
      delete about.dataset.homeTransition;
      delete about.dataset.homeTransitionEngine;
      delete about.dataset.homeTransitionState;
      delete about.dataset.homeRevealState;
      heroProperties.forEach((property) => hero.style.removeProperty(property));
      aboutProperties.forEach((property) => about.style.removeProperty(property));
      transitionState = "";
      aboutRevealState = "";
    };

    const activate = () => {
      deactivate();

      if (motionQuery.matches) {
        return;
      }

      const useLenis = finePointerQuery.matches;
      const engine = useLenis ? "lenis" : "native";

      hero.dataset.homeTransition = "active";
      hero.dataset.homeTransitionEngine = engine;
      about.dataset.homeTransition = "active";
      about.dataset.homeTransitionEngine = engine;
      updateTransition(window.scrollY);
      window.addEventListener("resize", scheduleNativeUpdate, { passive: true });

      if (useLenis) {
        lenis = new Lenis({
          allowNestedScroll: false,
          anchors: true,
          autoRaf: true,
          lerp: 0.115,
          smoothWheel: true,
          stopInertiaOnNavigate: true,
          syncTouch: false
        });
        document.documentElement.classList.add("home-lenis-active");
        lenis.on("scroll", (currentLenis) => updateTransition(currentLenis.animatedScroll));
      } else {
        window.addEventListener("scroll", scheduleNativeUpdate, { passive: true });
      }
    };

    motionQuery.addEventListener("change", activate);
    finePointerQuery.addEventListener("change", activate);
    activate();

    return () => {
      motionQuery.removeEventListener("change", activate);
      finePointerQuery.removeEventListener("change", activate);
      deactivate();
    };
  }, []);

  return null;
}
