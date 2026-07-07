import Image from "next/image";
import { ButtonLink } from "@/components/button-link";

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

export function NeighbourhoodScrollStory() {
  return (
    <section className="neighbourhood-story" id="neighbourhood-activities">
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
              src="/images/about-community.jpg"
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
              src="/images/community-event.jpg"
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
