import type { Metadata } from "next";
import { ProgrammeCard } from "@/components/programme-card";
import { SectionHeading } from "@/components/section-heading";
import { programmes } from "@/data/site";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "Explore children's classes, junior youth groups, youth mentoring and adult volunteer training in Manchester."
};

export default function ProgrammesPage() {
  const learningProgrammes = programmes.filter((programme) => programme.slug === "children" || programme.slug === "junior-youth");
  const volunteerProgrammes = programmes.filter((programme) => programme.slug === "youth" || programme.slug === "adults");

  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <div>
            <p className="eyebrow">Programmes</p>
            <h1>Education for every stage of community life</h1>
            <p className="page-hero__copy">
              Programmes support children, junior youth, youth and adults as they learn to develop
              their capacities and serve their neighbourhoods.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow="Children and junior youth" title="Spaces for younger generations" />
        <div className="programme-grid">
          {learningProgrammes.map((programme) => (
            <ProgrammeCard href={`/programmes/${programme.slug}`} key={programme.slug} programme={programme} />
          ))}
        </div>
      </section>

      <section className="section section--band">
        <div className="section__inner">
          <SectionHeading eyebrow="Volunteering" title="Training for youth and adults" />
          <div className="programme-grid">
            {volunteerProgrammes.map((programme) => (
              <ProgrammeCard href={`/get-involved/${programme.slug}`} key={programme.slug} programme={programme} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
