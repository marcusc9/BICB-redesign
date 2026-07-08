"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/button-link";
import { withBasePath } from "@/lib/base-path";

const activityStories = [
  {
    number: "01",
    neighbourhood: "Ardwick",
    title: "Children's classes",
    detail: "Weekly · Ages 5–10",
    description:
      "Children learn about qualities such as kindness, truthfulness, courage and generosity through stories, prayer, music, games and art."
  },
  {
    number: "02",
    neighbourhood: "Ardwick",
    title: "Junior youth groups",
    detail: "Weekly · Ages 11–15",
    description:
      "Young people strengthen their powers of expression, friendship and service as they study together and design practical projects for their neighbourhood."
  },
  {
    number: "03",
    neighbourhood: "Moss Side",
    title: "Training and accompaniment",
    detail: "Weekly · Youth and adults",
    description:
      "Youth and adults build the capacity to accompany children, teenagers and families—learning, acting and reflecting together as a team."
  },
  {
    number: "04",
    neighbourhood: "Moss Side",
    title: "Neighbourhood gatherings",
    detail: "Regular · All ages",
    description:
      "Spaces for prayer, conversation, food, arts and community consultation bring neighbours together and help new activities take root."
  }
];

const kineticParticles = [
  { x: "7%", y: "10%", size: "210px", shift: "var(--particle-shift-soft)", delay: "-4s" },
  { x: "76%", y: "8%", size: "150px", shift: "var(--particle-shift-medium)", delay: "-1s" },
  { x: "46%", y: "24%", size: "88px", shift: "var(--particle-shift-wide)", delay: "-7s" },
  { x: "12%", y: "55%", size: "126px", shift: "var(--particle-shift-medium)", delay: "-3s" },
  { x: "83%", y: "52%", size: "230px", shift: "var(--particle-shift-soft)", delay: "-9s" },
  { x: "36%", y: "80%", size: "170px", shift: "var(--particle-shift-medium)", delay: "-6s" }
] as const;

type KineticParticleStyle = CSSProperties & {
  "--particle-delay": string;
  "--particle-shift": string;
  "--particle-size": string;
  "--particle-x": string;
  "--particle-y": string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function NeighbourhoodScrollStory() {
  const storyRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const story = storyRef.current;

    if (!story) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      return;
    }

    let frame = 0;
    let active = false;
    const target = { progress: 0, x: 0, y: 0 };
    const current = { progress: 0, x: 0, y: 0 };

    const updateProgress = () => {
      const rect = story.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      target.progress = clamp((viewport - rect.top) / (rect.height + viewport), 0, 1);
    };

    const writeMotion = () => {
      current.x += (target.x - current.x) * 0.09;
      current.y += (target.y - current.y) * 0.09;
      current.progress += (target.progress - current.progress) * 0.08;

      const energy = clamp(Math.abs(current.x) * 0.55 + Math.abs(current.y) * 0.35 + current.progress * 0.45, 0, 1);

      story.style.setProperty("--motion-x", current.x.toFixed(3));
      story.style.setProperty("--motion-y", current.y.toFixed(3));
      story.style.setProperty("--motion-progress", current.progress.toFixed(3));
      story.style.setProperty("--motion-energy", energy.toFixed(3));
      story.style.setProperty("--mesh-x-a", `${current.x * 7}%`);
      story.style.setProperty("--mesh-y-a", `${current.y * 5}%`);
      story.style.setProperty("--mesh-x-b", `${current.x * -8}%`);
      story.style.setProperty("--mesh-y-b", `${current.y * -6}%`);
      story.style.setProperty("--motion-bg-x", `${current.x * 18}px`);
      story.style.setProperty("--motion-bg-y", `${current.y * 18}px`);
      story.style.setProperty("--motion-rotate-bg", `${current.progress * 10}deg`);
      story.style.setProperty("--motion-conic-angle", `${115 + current.progress * 95}deg`);
      story.style.setProperty("--motion-field-opacity", (0.72 + energy * 0.2).toFixed(3));
      story.style.setProperty("--motion-particle-opacity", (0.42 + energy * 0.28).toFixed(3));
      story.style.setProperty("--motion-particle-scale", (0.86 + energy * 0.16).toFixed(3));
      story.style.setProperty("--motion-glow-size", `${16 + energy * 28}px`);
      story.style.setProperty("--motion-title-glow", `${14 + energy * 18}px`);
      story.style.setProperty("--motion-step-opacity", (0.18 + energy * 0.28).toFixed(3));
      story.style.setProperty("--motion-step-scale", (0.8 + current.progress * 0.25).toFixed(3));
      story.style.setProperty("--motion-step-x", `${current.x * 22}px`);
      story.style.setProperty("--motion-step-y", `${-85 + current.y * 18}px`);
      story.style.setProperty("--motion-caption-x", `${current.x * 8}px`);
      story.style.setProperty("--motion-caption-y", `${current.y * 6}px`);
      story.style.setProperty("--motion-number-x", `${current.x * 10}px`);
      story.style.setProperty("--motion-number-y", `${current.y * 8}px`);
      story.style.setProperty("--motion-glow-x", `${current.x * 18}%`);
      story.style.setProperty("--motion-glow-y", `${current.y * 10}%`);
      story.style.setProperty("--motion-ardwick-x", `${current.x * -16}px`);
      story.style.setProperty("--motion-ardwick-y", `${current.y * -12}px`);
      story.style.setProperty("--motion-ardwick-tilt-x", `${current.y * -3}deg`);
      story.style.setProperty("--motion-ardwick-tilt-y", `${current.x * 4}deg`);
      story.style.setProperty("--motion-moss-x", `${current.x * 14}px`);
      story.style.setProperty("--motion-moss-y", `${current.y * 12}px`);
      story.style.setProperty("--motion-moss-tilt-x", `${current.y * 3}deg`);
      story.style.setProperty("--motion-moss-tilt-y", `${current.x * -4}deg`);
      story.style.setProperty("--particle-shift-soft", `${current.x * 18}px, ${current.y * 15 + current.progress * -30}px`);
      story.style.setProperty("--particle-shift-medium", `${current.x * 32}px, ${current.y * 28 + current.progress * -38}px`);
      story.style.setProperty("--particle-shift-wide", `${current.x * 46}px, ${current.y * 36 + current.progress * -46}px`);

      if (active) {
        frame = window.requestAnimationFrame(writeMotion);
      }
    };

    const start = () => {
      if (!frame) {
        updateProgress();
        frame = window.requestAnimationFrame(writeMotion);
      }
    };

    const stop = () => {
      if (frame) {
        window.cancelAnimationFrame(frame);
        frame = 0;
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = story.getBoundingClientRect();
      target.x = clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
      target.y = clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);
    };

    const handlePointerLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;

        if (active) {
          start();
        } else {
          stop();
        }
      },
      { rootMargin: "16% 0px", threshold: 0.01 }
    );

    observer.observe(story);
    story.addEventListener("pointermove", handlePointerMove);
    story.addEventListener("pointerleave", handlePointerLeave);
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    return () => {
      active = false;
      stop();
      observer.disconnect();
      story.removeEventListener("pointermove", handlePointerMove);
      story.removeEventListener("pointerleave", handlePointerLeave);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section className="neighbourhood-story" id="neighbourhood-activities" ref={storyRef}>
      <div aria-hidden="true" className="neighbourhood-story__kinetic-field">
        {kineticParticles.map((particle) => {
          const particleStyle: KineticParticleStyle = {
            "--particle-delay": particle.delay,
            "--particle-shift": particle.shift,
            "--particle-size": particle.size,
            "--particle-x": particle.x,
            "--particle-y": particle.y
          };

          return <span key={`${particle.x}-${particle.y}`} style={particleStyle} />;
        })}
      </div>

      <div className="neighbourhood-story__intro">
        <p className="eyebrow eyebrow--light">Weekly activities</p>
        <h2>Two neighbourhoods, one rhythm of community life</h2>
        <p>
          Keep scrolling to explore how children, teenagers, youth and adults learn and serve
          together each week in Ardwick and Moss Side.
        </p>
      </div>

      <div className="neighbourhood-story__layout">
        <aside className="neighbourhood-story__visuals" aria-label="Ardwick and Moss Side community activities">
          <figure className="neighbourhood-story__image neighbourhood-story__image--ardwick">
            <Image
              alt="Children and adults taking part in a community activity in Manchester"
              fill
              sizes="(max-width: 920px) 50vw, 42vw"
              src={withBasePath("/images/about-community.jpg")}
            />
            <figcaption>
              <span>Neighbourhood one</span>
              Ardwick
            </figcaption>
          </figure>
          <figure className="neighbourhood-story__image neighbourhood-story__image--moss-side">
            <Image
              alt="Friends gathered together at a community event in Manchester"
              fill
              sizes="(max-width: 920px) 50vw, 42vw"
              src={withBasePath("/images/community-event.jpg")}
            />
            <figcaption>
              <span>Neighbourhood two</span>
              Moss Side
            </figcaption>
          </figure>
        </aside>

        <div className="neighbourhood-story__steps">
          {activityStories.map((story) => (
            <article className="neighbourhood-story__step" key={story.number}>
              <div className="neighbourhood-story__step-number" aria-hidden="true">
                {story.number}
              </div>
              <p className="neighbourhood-story__location">{story.neighbourhood}</p>
              <h3>{story.title}</h3>
              <p className="neighbourhood-story__detail">{story.detail}</p>
              <p className="neighbourhood-story__description">{story.description}</p>
              {story.number === "04" ? (
                <ButtonLink href="/contact" variant="light">
                  Ask about local activities
                </ButtonLink>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
