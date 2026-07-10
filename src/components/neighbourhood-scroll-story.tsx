"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/button-link";
import { withBasePath } from "@/lib/base-path";

const activityStories = [
  {
    number: "01",
    neighbourhood: "Ardwick",
    title: "Children's classes",
    detail: "Weekly · Ages 5–10",
    visualTitle: "Ardwick",
    backgroundTone: "ardwick",
    image: "/images/about-community.jpg",
    imageAlt: "Children and adults taking part in a community activity in Ardwick",
    imagePosition: "center 36%",
    description:
      "Children learn about qualities such as kindness, truthfulness, courage and generosity through stories, prayer, music, games and art."
  },
  {
    number: "02",
    neighbourhood: "Ardwick",
    title: "Junior youth groups",
    detail: "Weekly · Ages 11–15",
    visualTitle: "Moss Side",
    backgroundTone: "moss-side",
    image: "/images/community-event.jpg",
    imageAlt: "Friends and families gathered around tables at a Moss Side community event",
    imagePosition: "center 42%",
    description:
      "Young people strengthen their powers of expression, friendship and service as they study together and design practical projects for their neighbourhood."
  },
  {
    number: "03",
    neighbourhood: "Moss Side",
    title: "Training and accompaniment",
    detail: "Weekly · Youth and adults",
    visualTitle: "Study Circles",
    backgroundTone: "study-circles",
    image: "/images/youth-training.jpg",
    imageAlt: "Youth studying and consulting together during a training session",
    imagePosition: "center 44%",
    description:
      "Youth and adults build the capacity to accompany children, teenagers and families—learning, acting and reflecting together as a team."
  },
  {
    number: "04",
    neighbourhood: "Moss Side",
    title: "Neighbourhood gatherings",
    detail: "Regular · All ages",
    visualTitle: "Youth and Family Camps",
    backgroundTone: "youth-camps",
    image: "/images/hero-community-building.jpg",
    imageAlt: "Youth and families consulting together during a community-building activity",
    imagePosition: "center 45%",
    description:
      "Spaces for prayer, conversation, food, arts and community consultation bring neighbours together and help new activities take root."
  }
];

export function NeighbourhoodScrollStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLElement | null>>([]);
  const activeStory = activityStories[activeIndex] ?? activityStories[0];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const steps = stepRefs.current.filter((step): step is HTMLElement => Boolean(step));

    if (!("IntersectionObserver" in window) || prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          setActiveIndex(Number((entry.target as HTMLElement).dataset.storyIndex));
        });
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: 0
      }
    );

    steps.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="neighbourhood-story" data-active-story={activeStory.backgroundTone} id="neighbourhood-activities">
      <div className="neighbourhood-story__backdrops" aria-hidden="true">
        {activityStories.map((story, index) => (
          <div
            className={
              index === activeIndex
                ? `neighbourhood-story__backdrop neighbourhood-story__backdrop--${story.backgroundTone} neighbourhood-story__backdrop--active`
                : `neighbourhood-story__backdrop neighbourhood-story__backdrop--${story.backgroundTone}`
            }
            key={`${story.number}-backdrop`}
          />
        ))}
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
          <figure className="neighbourhood-story__image">
            {activityStories.map((story, index) => (
              <Image
                alt={story.imageAlt}
                className={
                  index === activeIndex
                    ? "neighbourhood-story__photo neighbourhood-story__photo--active"
                    : "neighbourhood-story__photo"
                }
                fill
                key={story.number}
                sizes="(max-width: 920px) 100vw, 42vw"
                src={withBasePath(story.image)}
                style={{ objectPosition: story.imagePosition }}
              />
            ))}
            <figcaption>
              {activeStory.visualTitle}
            </figcaption>
          </figure>
        </aside>

        <div className="neighbourhood-story__steps">
          {activityStories.map((story, index) => (
            <article
              className="neighbourhood-story__step"
              data-story-index={index}
              key={story.number}
              ref={(element) => {
                stepRefs.current[index] = element;
              }}
            >
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
