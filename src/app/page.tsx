import { Mail, Phone } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/button-link";
import { Hero } from "@/components/hero";
import { HomeScrollTransition } from "@/components/home-scroll-transition";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { ProgrammePathScrollStory } from "@/components/programme-path-scroll-story";
import { SectionHeading } from "@/components/section-heading";
import { contactPoints, schemes, site, values } from "@/data/site";
import { withBasePath } from "@/lib/base-path";

const partnershipSlots = Array.from({ length: 5 }, (_, index) => `Partner logo ${index + 1}`);
const partnershipGroups = [0, 1] as const;

export default function Home() {
  return (
    <>
      <HomeScrollTransition />

      <div className="home-hero" data-home-transition-hero>
        <div className="home-hero__stage" data-home-transition-stage>
          <Hero
            image="/images/hero-community-building.jpg"
            imageAlt="People gathered around tables during a community building activity"
            quote='"The betterment of the world can be accomplished through pure and goodly deeds, through commendable and seemly conduct."'
            quoteAttribution="Bahá'u'lláh"
            title="Building a Better World Together"
          />
          <div className="home-hero__wash" aria-hidden="true" />
          <div className="home-hero__chapter" aria-hidden="true">
            <div className="home-hero__chapter-heading">
              <strong>Who we are</strong>
              <Image
                alt=""
                className="home-hero__chapter-logo"
                height={100}
                src={withBasePath("/images/ruhi-institute-logo.svg")}
                width={465}
              />
            </div>
            <i />
          </div>
        </div>
      </div>

      <section className="about-section about-section--home" data-home-transition-about id="about">
        <div className="about-shell">
          <div className="about-intro">
            <h2>Learning, serving and growing together</h2>
            <p className="lead">
              The Bahá&apos;í Institute for Community Building offers educational programmes for
              people from all backgrounds and ages in Manchester. These programmes help to develop
              vibrant communities as well as enhancing the intellectual, social and spiritual
              development of individuals.
            </p>
            <p>
              These programmes seek to contribute to the unity of the neighbourhood, through the
              promotion of a community building process which creates an environment for both
              individual and collective development.
            </p>
            <p>
              It provides support for the moral and spiritual education of children and teenagers,
              in addition to the development of capacity in youth and adults in the neighbourhood
              to contribute to this process of social transformation.
            </p>
            <figure className="about-community-photo">
              <Image
                alt="Junior youth and volunteers gathered for a community activity in a Manchester sports hall"
                fill
                sizes="(max-width: 920px) calc(100vw - 40px), 52vw"
                src={withBasePath("/images/junior-youth-group.jpeg")}
              />
            </figure>
          </div>

          <aside className="inspiration-card" aria-labelledby="inspiration-title">
            <p className="eyebrow eyebrow--light">Our inspiration</p>
            <h3 id="inspiration-title">Growing ourselves while serving others</h3>
            <p>
              The programmes draw on educational materials developed by the Ruhi Institute and
              used around the world. They invite participants to nurture their own spiritual and
              intellectual growth while contributing to the transformation of society.
            </p>
            <p>
              Inspired by the Writings of Bahá&apos;u&apos;lláh and the principles of the Bahá&apos;í
              Faith—especially the oneness of humanity—the programmes are open to and enriched by
              people from every background.
            </p>
            <div className="inspiration-links" aria-label="Find out more">
              <a href="https://www.bahai.org/bahaullah/">Learn about Bahá&apos;u&apos;lláh</a>
              <a href="https://www.bahai.org/">Explore the Bahá&apos;í Faith</a>
              <a href="https://www.manchesterbahais.org.uk/">Manchester Bahá&apos;í community</a>
            </div>
          </aside>
        </div>
      </section>

      <ProgrammePathScrollStory />

      <section className="section section--warm" id="holiday-schemes">
        <div className="section__inner">
          <div className="cta-band">
            <div>
              <p className="eyebrow eyebrow--light">Holiday schemes</p>
              <h2>{schemes.title}</h2>
              <p>{schemes.summary}</p>
            </div>
            <ButtonLink href="/schemes" variant="primary">
              View holiday schemes
            </ButtonLink>
          </div>

          <div
            aria-labelledby="partnership-strip-title"
            className="partnership-strip partnership-strip--inline"
          >
            <div className="partnership-strip__inner">
              <p className="partnership-strip__label" id="partnership-strip-title">
                In partnership with
              </p>
              <div
                className="partnership-strip__logos"
                aria-label="Partner logos awaiting confirmation"
              >
                <div className="partnership-strip__track">
                  {partnershipGroups.map((group) => (
                    <div
                      aria-hidden={group === 1}
                      className="partnership-strip__group"
                      key={group}
                    >
                      {partnershipSlots.map((label) => (
                        <div className="partnership-strip__placeholder" key={`${group}-${label}`}>
                          <span>{label}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parked for recall: “Neighbourhood Activities Scroll Story”. */}

      <section className="section service-section" id="service">
        <div className="section-heading section-heading--center">
          <h2>A path of service, walked together</h2>
        </div>
        <div className="grid grid--4 service-steps">
          {values.map((value) => {
            const ValueIcon = value.icon;

            return (
              <article className="info-card value-card" key={value.title}>
                <span className="value-card__icon" aria-hidden="true">
                  <ValueIcon size={22} strokeWidth={1.6} />
                </span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            );
          })}
        </div>
        <div className="testimony-grid">
          <article className="testimony-card">
            <PhotoPlaceholder label="Portrait photograph to come" variant="portrait" />
            <div>
              <p className="testimony-card__label">Testimony placeholder</p>
              <blockquote>
                Add a short reflection from a parent, young person or volunteer about what changed
                for them through the programme.
              </blockquote>
            </div>
          </article>
          <article className="testimony-card">
            <PhotoPlaceholder label="Portrait photograph to come" variant="portrait" />
            <div>
              <p className="testimony-card__label">Testimony placeholder</p>
              <blockquote>
                Add a second lived experience here to show the human effect of service, friendship
                and accompaniment.
              </blockquote>
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <SectionHeading eyebrow="Contact" title="Start with your neighbourhood">
          <p>
            For general questions, registrations or local activity details, contact the team by
            email or phone.
          </p>
        </SectionHeading>
        <div className="grid grid--4">
          {contactPoints.map((point) => (
            <article className="contact-card" key={point.name}>
              <h3>{point.name}</h3>
              <a href={point.href}>
                <Phone aria-hidden="true" size={18} />
                {point.phone}
              </a>
            </article>
          ))}
        </div>
        <div className="button-row" style={{ marginTop: 24 }}>
          <ButtonLink href={`mailto:${site.email}`} variant="secondary">
            <Mail aria-hidden="true" size={18} />
            Email us
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Contact details
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
