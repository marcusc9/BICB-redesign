import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { NeighbourhoodScrollStory } from "@/components/neighbourhood-scroll-story";
import { withBasePath } from "@/lib/base-path";

export const metadata: Metadata = {
  title: "Programmes",
  description:
    "See how children's classes, junior youth groups, training and neighbourhood activities form one community-building process in Manchester."
};

export default function ProgrammesPage() {
  return (
    <>
      <section className="programmes-editorial-hero">
        <div className="programmes-editorial-hero__inner">
          <div className="programmes-editorial-hero__copy">
            <p className="eyebrow">Programmes</p>
            <h1>A path of learning, service and community</h1>
            <p>
              The programmes are not separate destinations. Together, they form a shared process
              in which children, junior youth, youth and adults grow in capacity and contribute to
              the life of their neighbourhoods.
            </p>
            <div className="button-row">
              <ButtonLink href="#neighbourhood-activities">Experience the weekly rhythm</ButtonLink>
              <ButtonLink href="/get-involved" variant="ghost">
                Find a way to serve
              </ButtonLink>
            </div>
          </div>

          <div className="programmes-editorial-hero__visual" aria-label="Community programme photographs">
            <figure className="programmes-editorial-hero__photo programmes-editorial-hero__photo--primary">
              <Image
                alt="Youth and volunteers gathered at a Manchester community-building camp"
                fill
                priority
                sizes="(max-width: 920px) calc(100vw - 40px), 48vw"
                src={withBasePath("/images/programmes-youth-camp-collective.jpg")}
              />
            </figure>
            <figure className="programmes-editorial-hero__photo programmes-editorial-hero__photo--secondary">
              <Image
                alt="Children, youth and adults creating art together during a community camp"
                fill
                sizes="(max-width: 620px) 52vw, 22vw"
                src={withBasePath("/images/programmes-adult-camp-art.jpg")}
              />
            </figure>
            <div className="programmes-editorial-hero__note">
              <strong>Four pathways</strong>
              <span>One shared purpose</span>
            </div>
          </div>
        </div>
      </section>

      <NeighbourhoodScrollStory />

      <section className="programmes-next-step">
        <div className="programmes-next-step__inner">
          <div>
            <p className="eyebrow eyebrow--light">Your next step</p>
            <h2>Begin with one conversation</h2>
          </div>
          <div>
            <p>
              Whether you are looking for a space for a young person or want to learn how to serve,
              the team can help you find a natural place to begin.
            </p>
            <div className="button-row">
              <ButtonLink href="/get-involved">Explore ways to serve</ButtonLink>
              <ButtonLink href="/contact" variant="light">
                Contact the team
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
