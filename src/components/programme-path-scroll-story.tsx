"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BicbLogoScrollSequence } from "@/components/bicb-logo-scroll-sequence";
import { ButtonLink } from "@/components/button-link";
import { programmes } from "@/data/site";
import { withBasePath } from "@/lib/base-path";

const programmePhotography: Record<
  string,
  { alt: string; position: string; src: string }
> = {
  children: {
    alt: "Children and volunteers celebrating together outside a community centre",
    position: "center 44%",
    src: "/images/childrens-classes-outdoors.jpeg"
  },
  "junior-youth": {
    alt: "A junior youth participant painting during a creative group activity",
    position: "center 58%",
    src: "/images/junior-youth-art-session.jpeg"
  },
  youth: {
    alt: "Youth studying, consulting and creating together during a training session",
    position: "56% center",
    src: "/images/programmes-youth-training.jpg"
  },
  adults: {
    alt: "Adults and families gathered in a circle for community consultation",
    position: "center center",
    src: "/images/programmes-adult-volunteers.jpg"
  }
};

const flowerStoryBeats = [
  "Qualities take root",
  "Perception expands",
  "Capacity becomes service",
  "One shared process"
];

function clamp(value: number, minimum = 0, maximum = 1) {
  return Math.min(maximum, Math.max(minimum, value));
}

function programmeHref(slug: string) {
  if (slug === "children" || slug === "junior-youth") {
    return `/programmes/${slug}`;
  }

  return `/get-involved/${slug}`;
}

export function ProgrammePathScrollStory() {
  const rootRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEnhanced, setIsEnhanced] = useState(false);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const desktopQuery = window.matchMedia("(min-width: 1000px) and (pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateEnhancement = () => {
      const shouldEnhance = desktopQuery.matches && !motionQuery.matches;
      root.dataset.programmeStory = shouldEnhance ? "active" : "static";
      setIsEnhanced(shouldEnhance);

      if (!shouldEnhance) {
        activeIndexRef.current = 0;
        setActiveIndex(0);
        root.style.removeProperty("--programme-story-progress");
      }
    };

    desktopQuery.addEventListener("change", updateEnhancement);
    motionQuery.addEventListener("change", updateEnhancement);
    updateEnhancement();

    return () => {
      desktopQuery.removeEventListener("change", updateEnhancement);
      motionQuery.removeEventListener("change", updateEnhancement);
      delete root.dataset.programmeStory;
      root.style.removeProperty("--programme-story-progress");
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || !isEnhanced) {
      return;
    }

    let animationFrame: number | null = null;
    let isNearViewport = false;

    const updateFromScroll = () => {
      animationFrame = null;

      if (!isNearViewport) {
        return;
      }

      const headerHeight = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--header-height")
      );
      const stickyHeight = Math.max(1, window.innerHeight - headerHeight);
      const scrollDistance = Math.max(1, root.offsetHeight - stickyHeight);
      const progress = clamp((headerHeight - root.getBoundingClientRect().top) / scrollDistance);
      const nextIndex = Math.min(programmes.length - 1, Math.floor(progress * programmes.length));

      root.style.setProperty("--programme-story-progress", progress.toFixed(4));
      root.dataset.programmeStoryStep = String(nextIndex + 1);

      if (nextIndex !== activeIndexRef.current) {
        activeIndexRef.current = nextIndex;
        setActiveIndex(nextIndex);
      }
    };

    const scheduleUpdate = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateFromScroll);
      }
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isNearViewport = entry.isIntersecting;
        if (isNearViewport) {
          scheduleUpdate();
        }
      },
      { rootMargin: "80% 0px" }
    );

    visibilityObserver.observe(root);
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    scheduleUpdate();

    return () => {
      visibilityObserver.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [isEnhanced]);

  const moveToStage = (index: number) => {
    const root = rootRef.current;

    if (!root || !isEnhanced) {
      return;
    }

    const headerHeight = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-height")
    );
    const stickyHeight = Math.max(1, window.innerHeight - headerHeight);
    const scrollDistance = Math.max(1, root.offsetHeight - stickyHeight);
    const rootTop = window.scrollY + root.getBoundingClientRect().top - headerHeight;
    const stageProgress = (index + 0.5) / programmes.length;

    window.scrollTo({
      behavior: "smooth",
      top: rootTop + scrollDistance * stageProgress
    });
  };

  return (
    <section
      className="pathway-section programme-story"
      data-programme-story-root
      id="programmes"
      ref={rootRef}
    >
      <div className="pathway-shell programme-story__stage">
        <div className="pathway-intro programme-story__intro">
          <div className="programme-story__intro-copy">
            <h2>Community building begins with a path of service</h2>
            <p className="lead">
              From children discovering spiritual qualities to youth and adults learning to serve,
              each programme helps neighbours strengthen the life of their community.
            </p>
            <ButtonLink className="pathway-intro__button" href="/programmes">
              Explore all programmes
            </ButtonLink>
          </div>

          <div className="programme-story__flower">
            <div className="programme-story__flower-caption" aria-hidden="true">
              <span>{flowerStoryBeats[activeIndex]}</span>
              <strong>{activeIndex + 1} of {programmes.length}</strong>
            </div>
            <BicbLogoScrollSequence
              enabled={isEnhanced}
              progressRootRef={rootRef}
              variant="programme-story"
            />
          </div>
        </div>

        <div className="programme-story__content">
          <div className="pathway-grid programme-story__deck">
            {programmes.map((programme, index) => {
              const photography = programmePhotography[programme.slug];
              const isActive = index === activeIndex;
              const state = index < activeIndex ? "complete" : isActive ? "active" : "upcoming";

              return (
                <article
                  aria-hidden={isEnhanced && !isActive}
                  className={
                    isActive
                      ? "pathway-item programme-story__card programme-story__card--active"
                      : "pathway-item programme-story__card"
                  }
                  data-state={state}
                  inert={isEnhanced && !isActive}
                  key={programme.slug}
                >
                  <figure className="pathway-item__photo programme-story__photo">
                    <Image
                      alt={photography.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 620px) calc(100vw - 32px), (max-width: 999px) 44vw, 48vw"
                      src={withBasePath(photography.src)}
                      style={{ objectPosition: photography.position }}
                    />
                  </figure>
                  <div className="programme-story__card-body">
                    <span className="pathway-item__meta">{programme.ageRange}</span>
                    <h3>{programme.title}</h3>
                    <p>{programme.summary}</p>
                    <Link className="pathway-item__link" href={programmeHref(programme.slug)}>
                      Explore this path
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>

          <ol className="programme-story__progress" aria-label="Programme story progress">
            {programmes.map((programme, index) => {
              const state = index < activeIndex ? "complete" : index === activeIndex ? "active" : "upcoming";

              return (
                <li data-state={state} key={programme.slug}>
                  <button
                    aria-current={index === activeIndex ? "step" : undefined}
                    onClick={() => moveToStage(index)}
                    type="button"
                  >
                    <span aria-hidden="true" />
                    <small>{programme.audience}</small>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
