"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/button-link";
import { withBasePath } from "@/lib/base-path";

const activityStories = [
  {
    number: "01",
    neighbourhood: "Children and families",
    title: "Children's classes",
    detail: "Weekly · Ages 5–10",
    visualTitle: "Children's Classes",
    anchor: "childrens-classes",
    href: "/programmes/children",
    cta: "Explore children's classes",
    image: "/images/programmes-childrens-class.jpg",
    imageAlt: "Children and volunteers gathered for a class and music activity in a Manchester park",
    imagePosition: "center center",
    description:
      "Children learn about qualities such as kindness, truthfulness, courage and generosity through stories, prayer, music, games and art."
  },
  {
    number: "02",
    neighbourhood: "Junior youth",
    title: "Junior youth groups",
    detail: "Weekly · Ages 11–15",
    visualTitle: "Junior Youth Groups",
    anchor: "junior-youth-groups",
    href: "/programmes/junior-youth",
    cta: "Explore junior youth groups",
    image: "/images/programmes-junior-youth.jpg",
    imageAlt: "Junior youth and volunteers consulting around tables during a group activity",
    imagePosition: "center center",
    description:
      "Young people strengthen their powers of expression, friendship and service as they study together and design practical projects for their neighbourhood."
  },
  {
    number: "03",
    neighbourhood: "Youth and adults",
    title: "Training and accompaniment",
    detail: "Weekly · Youth and adults",
    visualTitle: "Youth Training",
    anchor: "training-and-accompaniment",
    href: "/get-involved/youth",
    cta: "Explore training and service",
    image: "/images/programmes-youth-training.jpg",
    imageAlt: "Youth studying, consulting and creating together during a training session",
    imagePosition: "56% center",
    description:
      "Youth and adults build the capacity to accompany children, teenagers and families—learning, acting and reflecting together as a team."
  },
  {
    number: "04",
    neighbourhood: "Whole community",
    title: "Neighbourhood gatherings",
    detail: "Regular · All ages",
    visualTitle: "Adult Volunteers",
    anchor: "neighbourhood-gatherings",
    href: "/contact",
    cta: "Ask about local activities",
    image: "/images/programmes-adult-volunteers.jpg",
    imageAlt: "Adults and families gathered in a circle for community consultation",
    imagePosition: "center center",
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
    <section
      className="neighbourhood-story neighbourhood-story--programmes"
      id="neighbourhood-activities"
    >
      <div className="neighbourhood-story__intro">
        <p className="eyebrow">Learning in action</p>
        <h2>One community-building process, experienced at every age</h2>
        <p>
          Follow a week of activity across Manchester—from spaces for children and junior youth to
          training, accompaniment and neighbourhood gatherings.
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
              id={story.anchor}
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
              <ButtonLink href={story.href} variant="secondary">
                {story.cta}
              </ButtonLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
