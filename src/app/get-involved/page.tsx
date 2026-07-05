import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { ProgrammeCard } from "@/components/programme-card";
import { SectionHeading } from "@/components/section-heading";
import { programmes } from "@/data/site";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Volunteer and train with the Bahá'í Institute for Community Building in Manchester as a youth mentor, children's class teacher or adult volunteer."
};

export default function GetInvolvedPage() {
  const volunteerProgrammes = programmes.filter((programme) => programme.slug === "youth" || programme.slug === "adults");

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <div>
            <p className="eyebrow">Get involved</p>
            <h1>Train, serve and accompany others</h1>
            <p className="page-hero__copy">
              Youth, adults and families can help create spaces for children, junior youth,
              parents, prayer, festivals and neighbourhood service.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow="Volunteering" title="Choose a path to begin" />
        <div className="programme-grid">
          {volunteerProgrammes.map((programme) => (
            <ProgrammeCard href={`/get-involved/${programme.slug}`} key={programme.slug} programme={programme} />
          ))}
        </div>
      </section>

      <section className="section section--warm">
        <div className="section__inner">
          <div className="cta-band">
            <div>
              <p className="eyebrow eyebrow--light">Training</p>
              <h2>Learning happens with others</h2>
              <p>
                Training takes place through neighbourhood study circles, weekly sessions and
                residential camps, with friends learning to serve alongside one another.
              </p>
            </div>
            <ButtonLink href="/contact">Contact the team</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
