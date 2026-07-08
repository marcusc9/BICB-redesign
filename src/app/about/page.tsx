import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { SectionHeading } from "@/components/section-heading";
import { programmes } from "@/data/site";
import { withBasePath } from "@/lib/base-path";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the Bahá'í Institute for Community Building in Manchester, its educational programmes and its neighbourhood-based process of service."
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <div>
            <p className="eyebrow">About us</p>
            <h1>Walking a path of service in Manchester</h1>
            <p className="page-hero__copy">
              The programmes of the Bahá'í Institute for Community Building draw on educational
              materials produced by the Ruhi Institute and invite residents to contribute to the
              transformation of society.
            </p>
          </div>
          <div className="page-hero__image">
            <Image
              alt="Participants at a community building gathering"
              fill
              priority
              sizes="(max-width: 920px) 100vw, 44vw"
              src={withBasePath("/images/about-community.jpg")}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="split">
          <div>
            <SectionHeading eyebrow="Purpose" title="Spiritual growth and social transformation" />
            <p className="lead">
              The Ruhi Institute's courses are used globally to develop materially and spiritually
              prosperous communities.
            </p>
            <p>
              This path implies a twofold sense of purpose: to attend to one's own spiritual and
              intellectual growth, and to contribute to the transformation of society.
            </p>
          </div>
          <div>
            <div className="quote-panel">
              "So powerful is the light of unity that it can illuminate the whole earth." - Bahá'u'lláh
            </div>
            <p>
              The programmes are inspired by the Writings of Bahá'u'lláh and the principles of the
              Bahá'í Faith, an independent world religion whose central principle is the oneness of
              humanity. People from all backgrounds participate and contribute.
            </p>
            <div className="button-row">
              <ButtonLink external href="https://www.bahai.org/" variant="secondary">
                Bahá'í Faith
              </ButtonLink>
              <ButtonLink external href="https://www.manchesterbahais.org.uk/" variant="ghost">
                Manchester Bahá'ís
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--band">
        <div className="section__inner">
          <SectionHeading eyebrow="Programmes" title="Four connected spaces" />
          <div className="grid grid--4">
            {programmes.map((programme) => (
              <article className="info-card" key={programme.slug}>
                <h3>{programme.title}</h3>
                <p>{programme.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
